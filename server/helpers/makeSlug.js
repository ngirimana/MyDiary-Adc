const changeSentenceToSlug = (sentence) => sentence.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/&/g, '-and-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');
export const slugginingTitle = (title, uniqueId) => `${changeSentenceToSlug(title)}-${uniqueId}`;
