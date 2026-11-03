import { createClient } from '@supabase/supabase-js'
import { tunerParts, type TunerPart } from '../data/tunerParts'

export type ProjectColor = 'ferrari-red' | 'emerald-blue' | 'stealth-black' | 'nardo-grey' | 'pearl-white'
export type TunerProject = { id: string; name: string; parts: TunerPart[]; hpGain: number; torqueGain: number; totalPrice: number; createdAt: string; color?: ProjectColor }
export type ProjectSource = 'supabase' | 'local'
type SaveResult = { source: ProjectSource; project: TunerProject }
const storageKey = 'turbo-motors:tuner-projects'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = url && key ? createClient(url, key) : null
const validColors = new Set<ProjectColor>(['ferrari-red', 'emerald-blue', 'stealth-black', 'nardo-grey', 'pearl-white'])

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null }
function parseProject(value: unknown): TunerProject | null {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.name !== 'string' || typeof value.createdAt !== 'string' || typeof value.hpGain !== 'number' || typeof value.torqueGain !== 'number' || typeof value.totalPrice !== 'number' || !Array.isArray(value.parts)) return null
  const parts = value.parts.map((part) => isRecord(part) && typeof part.id === 'string' ? tunerParts.find((catalogPart) => catalogPart.id === part.id) : undefined).filter((part): part is TunerPart => Boolean(part))
  const color = typeof value.color === 'string' && validColors.has(value.color as ProjectColor) ? value.color as ProjectColor : undefined
  return { id: value.id, name: value.name, parts, hpGain: value.hpGain, torqueGain: value.torqueGain, totalPrice: value.totalPrice, createdAt: value.createdAt, color }
}
function readLocal(): TunerProject[] { try { const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]'); return Array.isArray(parsed) ? parsed.map(parseProject).filter((project): project is TunerProject => project !== null) : [] } catch { return [] } }
function writeLocal(project: TunerProject) { localStorage.setItem(storageKey, JSON.stringify([project, ...readLocal().filter((current) => current.id !== project.id)].slice(0, 8))) }

export async function saveTunerProject(projectData: Omit<TunerProject, 'id' | 'createdAt'>): Promise<SaveResult> {
  const project: TunerProject = { ...projectData, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  if (!supabase) { writeLocal(project); return { source: 'local', project } }
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) { writeLocal(project); return { source: 'local', project } }
    const { error } = await supabase.from('tuner_projects').insert({ user_id: user.id, project_data: project })
    if (error) { writeLocal(project); return { source: 'local', project } }
    return { source: 'supabase', project }
  } catch { writeLocal(project); return { source: 'local', project } }
}

export async function getUserProjects(): Promise<{ source: ProjectSource; projects: TunerProject[] }> {
  if (!supabase) return { source: 'local', projects: readLocal() }
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return { source: 'local', projects: readLocal() }
    const { data, error } = await supabase.from('tuner_projects').select('project_data, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(8)
    if (error || !data) return { source: 'local', projects: readLocal() }
    return { source: 'supabase', projects: data.map((row) => parseProject(row.project_data)).filter((project): project is TunerProject => project !== null) }
  } catch { return { source: 'local', projects: readLocal() } }
}
