import { Component } from '@angular/core';
import { Grade } from '../../interfaces/grade.interface';
import { GradesConfiguration } from '../../classes/grades-configuration.class';
import { ValidateFunctionResponse } from '../../interfaces/validate-function-response.interface';

@Component({
  selector: 'app-grades-form',
  templateUrl: './grades-form.component.html',
  styleUrls: ['./grades-form.component.scss']
})
export class GradesFormComponent {

  grades: Grade[];
  gradesConfiguration: GradesConfiguration | null;
  showConfigModal: boolean = false;
  showReponseModal: boolean = false;
  finalGrade: number = 0;
  gradesValue: number = 0;
  messageResponse: string = "";
  remainingPercentage: number = 0;
  severity: string = "";
  infoMessage: string = "";

  constructor() {

    this.gradesConfiguration = new GradesConfiguration();
    this.grades = [
      {
        score: "",
        percentage: ""
      },
    ];



  }


  addNewGrade() {
    this.grades.push({
      score: "",
      percentage: ""
    });
  }

  deleteGrade(index: number) {
    this.grades.splice(index, 1);
  }


  openConfigModal() {
    this.showConfigModal = true;
  }

  closeConfigModal() {
    this.showConfigModal = false;
    this.gradesConfiguration = null;
    this.gradesConfiguration = new GradesConfiguration();
  }


  trackByIdx(index: number, obj: any): any {
    return index;
  }


  isValidScore(grade: Grade): ValidateFunctionResponse {


    if (grade.score === null) {
      return {
        isValid: false,
        message: "La nota no puede estar vacía.",
      }
    }



    if (isNaN(Number(grade.score))) {
      return {
        isValid: false,
        message: "La nota debe ser un número."
      }
    }



    if (Number(grade.score) < this.gradesConfiguration!.minGrade || Number(grade.score) > this.gradesConfiguration!.maxGrade) {
      return {
        isValid: false,
        message: `La nota debe estar entre ${this.gradesConfiguration!.minGrade} y ${this.gradesConfiguration!.maxGrade}.`
      }
    }


    return {
      isValid: true,
      message: ""
    }
  }

  isValidPercentage(grade: Grade): ValidateFunctionResponse {

    if (grade.percentage === null) {
      return {
        isValid: false,
        message: "El porcentaje no puede estar vacío."
      }
    }


    if (isNaN(Number(grade.percentage))) {
      return {
        isValid: false,
        message: "El porcentaje debe ser un número."
      }
    }


    if ((grade.percentage && Number(grade.percentage) <= 0) || Number(grade.percentage) > 100) {
      return {
        isValid: false,
        message: "El porcentaje debe estar entre 1 y 100."
      }
    }

    return {
      isValid: true,
      message: ""
    }

  }

  isValidGrades() {

    let isValid = true;
    let message = "";
    let remainingPercentage = 100;

    let indexsInvalid: number[] = [];

    this.grades.forEach((grade: Grade, index: number) => {

      if (!this.isValidScore(grade).isValid || !this.isValidPercentage(grade).isValid) {
        isValid = false;
        indexsInvalid.push(index + 1);
      }


    });

    if (!isValid) {
      message = "Las siguientes notas no son válidas: " + indexsInvalid.join(", ") + ".";
    }

    this.grades.forEach((grade: Grade) => {
      remainingPercentage -= Number(grade.percentage);
    });


    if (remainingPercentage < 0) {
      isValid = false;
      message = "La suma de los porcentajes no puede ser mayor a 100.";
    }


    return { isValid, message };

  }

  calculateGrade() {

    this.gradesValue = 0;

    this.grades.forEach((grade: Grade) => {
      this.gradesValue += Number(grade.score) * (Number(grade.percentage) / 100);
    });

    this.finalGrade = Math.round(this.gradesValue * 100) / 100;

    return;
  }


  verifyFinalScore(finalGrade: number, remainingPercentage: number) {



    switch (true) {

      case remainingPercentage === 0:
        this.severity = "finished";
        this.messageResponse = "¡Terminaste!";
        this.showReponseModal = true;
        break;

      case finalGrade > this.gradesConfiguration!.maxGrade:

        this.severity = "bad";
        this.messageResponse = "Jmm, la cosa está peluda";
        this.showReponseModal = true;
        break;

      case finalGrade > this.gradesConfiguration!.minGradeToPass && finalGrade <= this.gradesConfiguration!.maxGrade:
        this.severity = "normal";
        this.messageResponse = "Ya casi...";
        this.showReponseModal = true;
        break;

      case finalGrade > this.gradesConfiguration!.minGrade && finalGrade <= this.gradesConfiguration!.minGradeToPass:
        this.severity = "good";
        this.messageResponse = "¡Vamos bien!";
        this.showReponseModal = true;
        break;

      case finalGrade <= this.gradesConfiguration!.minGrade:
        this.severity = "great";
        this.messageResponse = "¡Eres un crack!";
        this.showReponseModal = true;
        break;

      default:
        throw new Error("Uninmplemented case in verifyFinalScore.");

    }

  }



  calculateFinalGrade() {

    if (!this.gradesConfiguration) return

    const isSomeEmpty = this.grades.some((grade: Grade, index: number) => {
      if (grade.score === "" || grade.percentage === "") {
        this.infoMessage = "Hay campos vacíos en la nota: " + (index + 1) + ".";
        return true;
      }
      return false;
    });

    if (isSomeEmpty) return;

    this.infoMessage = "";

    const validGrades = this.isValidGrades();

    if (!validGrades.isValid) {
      return;
    }

    this.calculateGrade();

    let remainingPercentage = 100;

    this.grades.forEach((grade: Grade) => {
      remainingPercentage -= Number(grade.percentage);
    });

    if (remainingPercentage === 0) {
      this.verifyFinalScore(this.finalGrade, remainingPercentage);
      return;
    }

    this.finalGrade = (this.gradesConfiguration!.gradeExpected - this.gradesValue) / (remainingPercentage / 100);

    this.finalGrade = Math.round(this.finalGrade * 100) / 100;

    remainingPercentage = Math.round(remainingPercentage * 100) / 100;

    this.remainingPercentage = remainingPercentage;

    this.verifyFinalScore(this.finalGrade, remainingPercentage);

  }

}
