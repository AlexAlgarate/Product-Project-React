export const splitProductTags = (tags: string[]): string[] => {
  return tags
    .flatMap((tag) => tag.split(','))
    .map((tag) => tag.trim())
    .filter(Boolean);
};
