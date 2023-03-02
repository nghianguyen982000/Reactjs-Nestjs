export type Course={
    id:string,
    title: string,
    description: string,
    image:string,
    benifit: string,
    field: string,
}

export type CreateCourse={
    title: string,
    description: string,
    file:File,
    benifit: string,
    field: string,
}