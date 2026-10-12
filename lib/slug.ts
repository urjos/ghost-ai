/**
 * Converts a string into a URL-friendly slug.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-alphanumeric chars (except space and dash)
    .replace(/[\s_-]+/g, "-") // replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading and trailing hyphens
}
