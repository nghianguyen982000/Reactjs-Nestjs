export type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  benefit: string[];
  field: string;
};

export type CreateCourse = {
  title: string;
  description: string;
  file: File;
  benefit: string;
  field: string;
};
