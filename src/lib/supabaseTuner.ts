import { createClient } from '@supabase/supabase-js'
import type { TunerPart } from '../data/tunerParts'

export type TunerProject = { id: string; name: string; parts: TunerPart[]; hpGain: number; torqueGain: number; totalPrice: number; createdAt: string }
type SaveResult = { source: 'supabase' | 'local'; project: TunerProject }
const storageKey = 'turbo-motors:tuner-projects'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = url && key ? createClient(url, key) : null

const readLocal = (): TunerProject[] => { try { return JSON.parse(localStorage.getItem(storageKey) ?? '[]') as TunerProject[] } catch { return [] } }
const writeLocal = (project: TunerProject) => localStorage.setItem(storageKey, JSON.stringify([project, ...readLocal()].slice(0, 8)))

export async function saveTunerProject(projectData: Omit<TunerProject, 'id' | 'createdAt'>): Promise<SaveResult> {
  const project: TunerProject = { ...projectData, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  if (!supabase) { writeLocal(project); return { source: 'local', project } }
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { writeLocal(project); return { source: 'local', project } }
  const { error } = await supabase.from('tuner_projects').insert({ user_id: user.id, project_data: project })
  if (error) { writeLocal(project); return { source: 'local', project } }
  return { source: 'supabase', project }
}

export async function getUserProjects(): Promise<{ source: 'supabase' | 'local'; projects: TunerProject[] }> {
  if (!supabase) return { source: 'local', projects: readLocal() }
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { source: 'local', projects: readLocal() }
  const { data, error } = await supabase.from('tuner_projects').select('project_data, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(8)
  if (error || !data) return { source: 'local', projects: readLocal() }
  const projects = data.map((row) => row.project_data as TunerProject).filter(Boolean)
  return { source: 'supabase', projects }
}
