export interface BookInterface {
    id?: string,
    title: string,
    available: Boolean,
    status: number | 0 | 1 | 2,
    authors: Array<string>,
    bookCover?: string
}