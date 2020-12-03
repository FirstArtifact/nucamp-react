class Student {
    constructor(name, email, community) {
        this.name = name;
        this.email = email;
        this.community = community;
    }
};

class Bootcamp {
    constructor(name, level, students = []){
        this.name = name;
        this.students = students;
        this. level = level;
    }

    registerStudent(student) {
        //if(this.students.some(s => s.email === student.email)) {
        if (this.students.filter(s => s.email === student.email).length) {
            console.log(`The student with the email '${student.email}' is already registered to ${this.name} under the name "${student.name}"`);
        }
        else {
            this.students.push(student);
            console.log(`Registering ${student.name} to ${this.name} class with the email "${student.email}"`)
        }
        return this.studentes;
    }
}