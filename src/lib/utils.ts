/**
 * Converts a project title to a URL-safe slug.
 * "Swift-Tix" → "swift-tix", "Toy verse" → "toy-verse"
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Required recruiter fields that must be present on every project */
export const REQUIRED_FIELDS = [
  'slug', 'role', 'problem', 'solution', 'outcomes',
  'challenges', 'techDecisions', 'architectureOverview',
  'duration', 'teamSize', 'featured',
] as const;

/**
 * Validates a project object in development. Warns on missing fields.
 */
export function validateProject(project: { title: string; [key: string]: unknown }): void {
  if (process.env.NODE_ENV !== 'production') {
    for (const field of REQUIRED_FIELDS) {
      if (project[field] === undefined || project[field] === null) {
        console.warn(
          `[projectsData] Project "${project.title}" is missing required field: "${field}"`
        );
      }
    }
  }
}
