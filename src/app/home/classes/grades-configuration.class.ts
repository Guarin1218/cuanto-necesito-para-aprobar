import { ValidateFunctionResponse } from "../interfaces/validate-function-response.interface";


export class GradesConfiguration {

    private _minGrade: number;
    private _maxGrade: number;
    private _minGradeToPass: number;
    private _gradeExpected: number;

    constructor(
        minGrade: number = 0,
        maxGrade: number = 5,
        minGradeToPass: number = 3,
        gradeExpected: number = 3) {

        this._minGrade = minGrade;
        this._maxGrade = maxGrade;
        this._minGradeToPass = minGradeToPass;
        this._gradeExpected = gradeExpected;
    }

    public get minGrade(): number {
        return this._minGrade;
    }
    public set minGrade(value: number) {
        this._minGrade = value;
    }

    public get maxGrade(): number {
        return this._maxGrade;
    }
    public set maxGrade(value: number) {
        this._maxGrade = value;
    }

    public get minGradeToPass(): number {
        return this._minGradeToPass;
    }
    public set minGradeToPass(value: number) {
        this._minGradeToPass = value;
    }

    public get gradeExpected(): number {
        return this._gradeExpected;
    }
    public set gradeExpected(value: number) {
        this._gradeExpected = value;
    }

    validateMinGrade(): ValidateFunctionResponse {

        if (this._minGrade == null) {
            return { isValid: false, message: 'El valor de la nota mínima es requerido.' };
        }

        if (this._minGrade < 0) {
            return { isValid: false, message: 'El valor de la nota mínima debe ser mayor o igual a cero.' };
        }

        if (this._minGrade > this._maxGrade) {
            return { isValid: false, message: 'El valor de la nota mínima debe ser menor o igual a la nota máxima.' };
        }

        return { isValid: true, message: '' };

    }


    validateMaxGrade(): ValidateFunctionResponse {

        if (this._maxGrade == null) {
            return { isValid: false, message: 'El valor de la nota máxima es requerido.' };
        }

        if (this._maxGrade < 0) {
            return { isValid: false, message: 'El valor de la nota máxima debe ser mayor o igual a cero.' };
        }

        if (this._maxGrade < this._minGrade) {
            return { isValid: false, message: 'El valor de la nota máxima debe ser mayor o igual a la nota mínima.' };
        }

        return { isValid: true, message: '' };

    }


    validateMinGradeToPass(): ValidateFunctionResponse {

        if (this._minGradeToPass == null) {
            return { isValid: false, message: 'El valor de la nota mínima para aprobar es requerido.' };
        }

        if (this._minGradeToPass < 0) {
            return { isValid: false, message: 'El valor de la nota mínima para aprobar debe ser mayor o igual a cero.' };
        }

        if (this._minGradeToPass < this._minGrade) {
            return { isValid: false, message: 'El valor de la nota mínima para aprobar debe ser mayor o igual a la nota mínima.' };
        }

        if (this._minGradeToPass > this._maxGrade) {
            return { isValid: false, message: 'El valor de la nota mínima para aprobar debe ser menor o igual a la nota máxima.' };
        }

        return { isValid: true, message: '' };

    }

    validateGradeExpected(): ValidateFunctionResponse {

        if(this._gradeExpected == null){
            return { isValid: false, message: 'El valor de la nota esperada es requerido.' };
        }

        if(this._gradeExpected < 0){
            return { isValid: false, message: 'El valor de la nota esperada debe ser mayor o igual a cero.' };
        }

        if(this._gradeExpected < this._minGrade){
            return { isValid: false, message: 'El valor de la nota esperada debe ser mayor o igual a la nota mínima.' };
        }

        if(this._gradeExpected > this._maxGrade){
            return { isValid: false, message: 'El valor de la nota esperada debe ser menor o igual a la nota máxima.' };
        }
        
        return { isValid: true, message: '' };

    }

    isValidConfiguration(): boolean {
        return this.validateMinGrade().isValid && this.validateMaxGrade().isValid && this.validateMinGradeToPass().isValid && this.validateGradeExpected().isValid;
    }


}