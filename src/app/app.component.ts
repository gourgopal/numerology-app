import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DropDown {
  displayName: string;
  value: Gender;
}

enum Gender {
  Male,
  Female
}

enum Planes {
  Golden,
  Silver,
  Mind,
  Heart,
  Practical,
  Action,
  Will,
  Thought
}

enum SmallPlane {
  OneThree,
  ThreeNine,
  NineSeven,
  OneSeven
}

enum EarthElement {
  Fire,
  Water,
  Gold,
  Earth,
  Wood
}

interface Person {
  Psychic: number;
  Destiny: number;
  karmic: number;
  HeartDesire: number[];
  FirstImpression: number;
  Missing: number[];
  Complementary: number[];
  CompletePlanes: Planes[];
  PartialPlanes: Planes[];
  SmallPlanes: SmallPlane[];
  IsFriendlyPsychicDestiny: boolean;
  Elements: EarthElement[];
  LuShoGrid: number[][];
  KarmicDebt: number;
  MasterNumber: number;
  Repeating: number;
}

interface NameNumber {
  Name: string;
  Number: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _snackBar: MatSnackBar) { }
  title: string = 'numerology-app';
  name: string = '';
  selectedGender: Gender | undefined;
  dob: Date = new Date();
  person: Person | undefined;
  generatedNos: number[] = [];
  ones: string = '';
  twos: string = '';
  threes: string = '';
  fours: string = '';
  fives: string = '';
  sixes: string = '';
  sevens: string = '';
  eights: string = '';
  nines: string = '';

  genders: DropDown[] = [
    { value: Gender.Male, displayName: Gender[Gender.Male] },
    { value: Gender.Female, displayName: Gender[Gender.Female] },
  ];

  openSnackBar(message: string, action: string = 'Okay') {
    this._snackBar.open(message, action);
  }

  calculate() {
    this._snackBar.dismiss();
    this.generatedNos = [];
    if (this.dob === undefined) {
      this.openSnackBar("Please enter a valid birthday");
    } else if (this.name.trim().length < 1) {
      this.openSnackBar("Please enter a valid name");
    } else if (this.selectedGender === undefined) {
      this.openSnackBar("Please choose a gender");
    }

    const psychic = this.getPsychic();
    const destiny = this.getDestinyNumber();
    const kNo = this.getKuaNumber();
    const masters = this.getMasterNumbers();
    this.generatedNos = this.generateNumbers(psychic, destiny, kNo);
    this.initLuShoGrid();

    console.log("psychic number = " + this.getPsychic());
    console.log("destiny number = " + this.getDestinyNumber());
    console.log("master numbers = " + this.getMasterNumbers());
    console.log("karmic number = " + this.getKuaNumber());
    console.log("lu sho numbers = " + this.generatedNos);
    console.log("missing numbers = " + this.getMissingNumbers());
    console.log("First Impression Number = " + this.getPersonalityNumber());
    console.log("Soul Urge Number = ");
    let hdNum = this.getHeartDesireNumber();
    hdNum.forEach(element => {
      console.log(element);
    });

    // let p: Person = {
    //   Psychic: 1,
    //   Destiny: 1
    // }
    // this.person = p;
  }

  initLuShoGrid() {
    this.ones = '';
    this.twos = '';
    this.threes = '';
    this.fours = '';
    this.fives = '';
    this.sixes = '';
    this.sevens = '';
    this.eights = '';
    this.nines = '';
    this.generatedNos.forEach(n => {
      switch (n) {
        case 1:
          this.ones += n;
          break;
        case 2:
          this.twos += n;
          break;
        case 3:
          this.threes += n;
          break;
        case 4:
          this.fours += n;
          break;
        case 5:
          this.fives += n;
          break;
        case 6:
          this.sixes += n;
          break;
        case 7:
          this.sevens += n;
          break;
        case 8:
          this.eights += n;
          break;
        case 9:
          this.nines += n;
          break;
      }
    });
  }

  getPsychic(): number {
    return this.getSingleNumber(this.dob.getDate());
  }

  getSingleNumber(value: number): number {
    return (value - 1) % 9 + 1;
  }

  getMasterNumbers(): number[] {
    let masterNumber: number[] = [];

    let date = this.dob.getDate();
    if (date > 9) {
      if (date === 11 || date === 22 || date === 29) {
        if (date === 29) {
          date = 11;
        }
        masterNumber.push(date);
      }
      date = this.getSingleNumber(date);
    }

    let month = this.dob.getMonth() + 1;
    if (month === 11) {
      masterNumber.push(month);
    } else if (month > 9) {
      month = this.getSum(month);
    }

    let yearSum = this.getSum(this.dob.getFullYear());
    switch (yearSum) {
      case 11:
      case 22:
      case 33:
      case 44:
      case 55:
      case 66:
        masterNumber.push(yearSum);
        break;
    }

    let total = date + month + yearSum;
    while (total > 9) {
      total = this.getSum(total);
      if (this.isMasterNumber(total)) {
        masterNumber.push(total);
      }
    }

    console.log("Destiny* = " + total)

    return masterNumber;
  }

  getSum(value: number): number {
    let sum = 0;

    while (value) {
      sum += value % 10;
      value = Math.floor(value / 10);
    }
    return sum;
  }

  getDestinyNumber(): number {
    return this.getSingleNumber(this.dob.getDate() + this.dob.getMonth() + 1 + this.dob.getFullYear());
  }

  getKuaNumber(): number {
    const _year = this.getSingleNumber(this.dob.getFullYear());
    return this.getSingleNumber(this.selectedGender === Gender.Male ? 11 - _year : 4 + _year);
  }

  isMasterNumber(date: number): boolean {
    return (date === 11 || date === 22 || date === 33 || date === 44 || date === 55);
  }

  generateNumbers(psychic: number, destiny: number, KuaNumber: number): number[] {
    const date: number = this.dob.getDate();
    const month: number = this.dob.getMonth() + 1;
    const year: number = this.dob.getFullYear();

    let numbers: number[] = [];

    //if date = 1 to 9, 10, 20, 30 - do no add as psychic is added for the same
    if (date !== 10 && date !== 20 && date !== 30 && date > 10) {
      numbers.push(date % 10);
      numbers.push((date / 10) | 0);
    }

    //month
    if (month <= 9) {
      numbers.push(month);
    } else if (month === 10) {
      numbers.push(1);
    } else if (month === 11) {
      numbers.push(1);
      numbers.push(1);
    } else if (month === 12) {
      numbers.push(1);
      numbers.push(2);
    }

    //year
    let _year = year;
    while (_year) {
      numbers.push(_year % 10);
      _year = (_year / 10) | 0;
    }

    numbers.push(psychic);
    numbers.push(destiny);
    numbers.push(KuaNumber);

    return numbers;
  }

  getMissingNumbers(): number[] {
    let missingNos: number[] = [];

    for (let i = 1; i <= 9; ++i) {
      if (this.generatedNos.includes(i) === false) {
        missingNos.push(i);
      }
    }

    return missingNos;
  }

  getPersonalityNumber(): number {
    let sum: number = 0;
    for (let alphabet of this.name.toLowerCase()) {
      if (!this.isVowel(alphabet)) {
        sum += this.getLetterMap(alphabet);
      }
    }
    return this.getSingleNumber(sum);
  }

  getHeartDesireNumber(): NameNumber[] {
    let hdNum: NameNumber[] = [];
    let sumOfSum: number = 0;
    this.name.toLowerCase().split(' ').forEach(element => {
      let sum: number = 0;
      for (let i = 0; i < element.length; ++i) {
        if (i === 0 && element[i] === 'y') {
          continue;
        }
        if (this.isVowel(element[i])) {
          sum += this.getLetterMap(element[i]);
        }
      }
      sumOfSum += sum;
      hdNum.push({ Name: element, Number: this.getSingleNumber(sum) });
    });
    hdNum.push({ Name: this.name, Number: this.getSingleNumber(sumOfSum) });
    return hdNum;
  }

  isVowel(letter: string): boolean {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(letter.toLowerCase()) !== -1;
  }

  getLetterMap(ch: string): number {
    switch (ch) {
      case 'a': return this.letterMap.a;
      case 'b': return this.letterMap.b;
      case 'c': return this.letterMap.c;
      case 'd': return this.letterMap.d;
      case 'e': return this.letterMap.e;
      case 'f': return this.letterMap.f;
      case 'g': return this.letterMap.g;
      case 'h': return this.letterMap.h;
      case 'i': return this.letterMap.i;
      case 'j': return this.letterMap.j;
      case 'k': return this.letterMap.k;
      case 'l': return this.letterMap.l;
      case 'm': return this.letterMap.m;
      case 'n': return this.letterMap.n;
      case 'o': return this.letterMap.o;
      case 'p': return this.letterMap.p;
      case 'q': return this.letterMap.q;
      case 'r': return this.letterMap.r;
      case 's': return this.letterMap.s;
      case 't': return this.letterMap.t;
      case 'u': return this.letterMap.u;
      case 'v': return this.letterMap.v;
      case 'w': return this.letterMap.w;
      case 'x': return this.letterMap.x;
      case 'y': return this.letterMap.y;
      case 'z': return this.letterMap.z;
      default:
        return 0;
    }
  }

  letterMap = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 8,
    'g': 3,
    'h': 5,
    'i': 1,
    'j': 1,
    'k': 2,
    'l': 3,
    'm': 4,
    'n': 5,
    'o': 7,
    'p': 8,
    'q': 1,
    'r': 2,
    's': 3,
    't': 4,
    'u': 6,
    'v': 6,
    'w': 6,
    'x': 5,
    'y': 1,
    'z': 7
  }
}
