import { Option } from "../components/Select/Select";
export const options: Option[] = [
  { value: "Oliver Hansen", label: "Oliver Hansen" },
  { value: "Van Henry", label: "Van Henry" },
  { value: "Lam Tran", label: "Lam Tran" },
  { value: "April Tucker", label: "April Tucker" },
  { value: "Ralph Hubbard", label: "Ralph Hubbard" },
  { value: "Andrew Tate", label: "Andrew Tate" },
  { value: "Barack Obama", label: "Barack Obama" },
  { value: "Donald Trump", label: "Donald Trump" },
  { value: "Joe Biden", label: "Joe Biden" },
  { value: "Brad Pitt", label: "Brad Pitt" },
  { value: "Angelina Joli", label: "Angelina Jolie" },
  { value: "Leonardo DiCaprio", label: "Leonardo DiCaprio" },
  { value: "Jennifer Aniston", label: "Jennifer Aniston" },
  { value: "George Clooney", label: "George Clooney" },
];

export const celebritiesOption: Option[] = Array.from(
  { length: 100 },
  (_, index) => ({
    value: `option${index + 1}`,
    label: `Celebrity ${index + 1}`,
  })
);
