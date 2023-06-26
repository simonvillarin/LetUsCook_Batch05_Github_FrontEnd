export interface Subject {
  subjectId?: number;
  programId?: number;
  subjectCode?: string;
  subjectTitle?: string;
  units?: number;
  preRequisites?: string[];
  type?: string;
  activeDeactive?: boolean;
}
