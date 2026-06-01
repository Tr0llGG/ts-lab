let userName: string = "Алибек";
let age: number = 20;
let isStudent: boolean = true;

let skills: string[] = ["React", "JavaScript", "HTML"];
let scores: number[] = [85, 90, 78];

let id: string | number = 101;
id = "A101";

function greet(name: string): string {
  return `Привет, ${name}!`;
}

function add(a: number, b: number): number {
  return a + b;
}

function logMessage(message: string): void {
  console.log(message);
}

interface User {
  id: number;
  name: string;
  email: string;
  age?: number; 
}

const user: User = {
  id: 1,
  name: "vlad",
  email: "vlad@gmail.com",
};

type Status = "active" | "inactive" | "pending";

type Product = {
  id: number;
  title: string;
  price: number;
  status: Status;
};

const product: Product = {
  id: 1,
  title: "Ноутбук",
  price: 150000,
  status: "active",
};

//1

interface Student {
  id: number;
  fullName: string;
  group: string;
  gpa: number;
  email?: string;
}

const students: Student[] = [
  {
    id: 1,
    fullName: "Половец Владислав",
    group: "22ПО",
    gpa: 4,
    email: "vladislav@mail.ru",
  },
  {
    id: 2,
    fullName: "Жакупов Адиль",
    group: "22ПО",
    gpa: 3.5,
  },
  {
    id: 3,
    fullName: "Базарбай Нурдаулет",
    group: "22ПО",
    gpa: 3.9,
    email: "nurda@mail.ru",
  },
];

console.log(students);