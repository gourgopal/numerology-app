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
  Golden = "Golden",
  Silver = "Silver",
  Mind = "Mind",
  Heart = "Heart",
  Practical = "Practical",
  Action = "Action",
  Will = "Will",
  Thought = "Thought"
}

type EnumDictionary<T extends Planes | SmallPlane | MissingPlane, U> = {
  [K in T]: U;
};

const PlanesDefinition: EnumDictionary<Planes, number[]> = {
  [Planes.Golden]: [4, 5, 6],
  [Planes.Silver]: [2, 5, 8],
  [Planes.Mind]: [4, 9, 2],
  [Planes.Heart]: [3, 5, 7],
  [Planes.Practical]: [8, 1, 6],
  [Planes.Thought]: [4, 3, 8],
  [Planes.Will]: [9, 5, 1],
  [Planes.Action]: [2, 7, 6]
}

enum SmallPlane {
  OneThree = "OneThree",
  ThreeNine = "ThreeNine",
  NineSeven = "NineSeven",
  OneSeven = "OneSeven"
}

const SmallPlanesDefinition: EnumDictionary<SmallPlane, number[]> = {
  [SmallPlane.OneThree]: [1, 3],
  [SmallPlane.ThreeNine]: [3, 9],
  [SmallPlane.NineSeven]: [9, 7],
  [SmallPlane.OneSeven]: [1, 7]
}

enum MissingPlane {
  Weakness = "Weakness",
  Doubt = "Doubt",
  Loneliness = "Loneliness",
  Confusion = "Confusion"
}

const MissingPlaneDefinition: EnumDictionary<MissingPlane, number[]> = {
  [MissingPlane.Doubt]: [4, 5, 6],
  [MissingPlane.Weakness]: [2, 5, 8],
  [MissingPlane.Loneliness]: [3, 5, 7],
  [MissingPlane.Confusion]: [2, 7, 6]
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

//friendly psychic and destiny
enum RelationType {
  Friend = "Friend",
  Enemy = "Enemy",
  Neutral = "Neutral",
  Temporary_Friend = "Temporary_Friend"
}

interface Relation {
  Number: number;
  Friends: number[];
  Enemies?: number[];
  Neutrals: number[];
  Temporary_Friend?: number[];
}

const RelationDefinition: Relation[] = [
  { Number: 1, Friends: [1, 2, 3, 5, 6, 9], Enemies: [8], Neutrals: [4, 7] },
  { Number: 2, Friends: [1, 2, 3, 5], Enemies: [4, 8, 9], Neutrals: [6, 7] },
  { Number: 3, Friends: [1, 2, 3, 5], Enemies: [6], Neutrals: [4, 7, 8, 9] },
  { Number: 4, Friends: [1, 5, 6, 7], Enemies: [2, 4, 8, 9], Neutrals: [3], Temporary_Friend: [4, 8] },
  { Number: 5, Friends: [1, 2, 3, 5, 6], Neutrals: [4, 7, 8, 9] },
  { Number: 6, Friends: [1, 5, 6, 7], Enemies: [3], Neutrals: [2, 4, 8, 9] },
  { Number: 7, Friends: [1, 3, 4, 5, 6], Neutrals: [2, 7, 8, 9] },
  { Number: 8, Friends: [3, 4, 5, 6, 7, 8], Enemies: [1], Neutrals: [9], Temporary_Friend: [4, 8] },
  { Number: 9, Friends: [1, 3, 5], Enemies: [4, 2], Neutrals: [6, 7, 8, 9] }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _snackBar: MatSnackBar) { }
  title: string = 'numerology-app';
  name: string = 'Goura Gopal Dalai';
  selectedGender: Gender | undefined = Gender.Male;
  dob: Date = new Date('12/5/1996');
  person: Person | undefined;
  generatedNumbers: number[] = [];
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
    this.generatedNumbers = [];
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
    this.generatedNumbers = this.generateNumbers(psychic, destiny, kNo);
    this.initLuShoGrid();

    const missingNumbers = this.getMissingNumbers();
    console.log("psychic number = " + psychic);
    console.log("destiny number = " + destiny);
    console.log("master numbers = " + masters);
    console.log("karmic number = " + kNo);
    console.log("lu sho numbers = " + this.generatedNumbers);
    console.log("missing numbers = " + missingNumbers);
    console.log("complementary numbers = " + this.getComplementaryNumbers(missingNumbers));
    console.log("First Impression Number = " + this.getPersonalityNumber());
    console.log("Soul Urge Number = ");
    let hdNum = this.getHeartDesireNumber();
    hdNum.forEach(element => {
      console.log(element);
    });
    console.log("karmic debt number = " + this.getKarmicDebtNumber());
    console.log("Planes = " + this.getPlanes());
    console.log("Small Planes = " + this.getSmallPlanes());
    console.log("Missing Planes = " + this.getMissingPlanes(missingNumbers));
    console.log("Friendly Psychic " + psychic + " and Destiny " + destiny + " = " + this.getRelation(psychic, destiny));
    console.log("Friendly Destiny " + destiny + " and Psychic " + psychic + " = " + this.getRelation(destiny, psychic));
    console.log("Repeating Numbers = " + this.getRepeatingNumbers());
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
    this.generatedNumbers.forEach(n => {
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
      if (this.generatedNumbers.includes(i) === false) {
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
    const fullName: string[] = this.name.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
    let firstAndMiddleName = fullName.slice(0, -1).join(' ');

    hdNum.push({ Name: this.name, Number: this.getSingleNumber(this.getVowelNumber(this.name.toLowerCase())) });
    hdNum.push({ Name: firstName, Number: this.getSingleNumber(this.getVowelNumber(firstName.toLowerCase())) });
    hdNum.push({ Name: firstAndMiddleName, Number: this.getSingleNumber(this.getVowelNumber(firstAndMiddleName.toLowerCase())) });
    hdNum.push({ Name: lastName, Number: this.getSingleNumber(this.getVowelNumber(lastName.toLowerCase())) });

    return hdNum;
  }

  getVowelNumber(name: string): number {
    let sum: number = 0;
    for (let j = 0; j < name.length; ++j) {
      if (j === 0 && name[j] === 'y') {
        continue;
      }
      if (this.isVowel(name[j])) {
        sum += this.getLetterMap(name[j]);
      }
    }
    return this.getSingleNumber(sum);
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

  getComplementaryNumbers(missingNumbers: number[]): number[] {
    let complementaryNumbers: number[] = [];

    missingNumbers.forEach(element => {
      complementaryNumbers
        .push(...this.getComplementaryForMissing(element));
      //this is ECMAScript 6 spread syntax (optimized way of merging two arrays)
    });

    return complementaryNumbers;
  }

  getComplementaryForMissing(missingNumber: number): number[] {
    switch (missingNumber) {
      case 1:
        return [9];
      case 2:
        return [5, 7];
      case 3:
        return [5, 7];
      case 4:
        return [8];
      case 5:
        return [];
      case 6:
        return [5];
      case 7:
        return [3];
      case 8:
        return [5, 4];
      case 9:
        return [1];
      default:
        return [];
    }
  }

  hasKarmicDebtNumber(): boolean {
    switch (this.dob.getDate()) {
      case 10:
      case 13:
      case 14:
      case 16:
      case 19:
        return true;
      default:
        return false;
    }
  }

  getKarmicDebtNumber(): number | undefined {
    if (this.hasKarmicDebtNumber()) {
      return this.dob.getDate();
    }
    return undefined;
  }

  checker = (arr: number[], target: number[]) => target.every(v => arr.includes(v));
  getPlanes(): Planes[] {
    let planes: Planes[] = [];

    for (let item in Planes) {
      const plane = Planes[item as Planes];
      if (this.checker(this.generatedNumbers, PlanesDefinition[plane])) {
        planes.push(plane);
      }
    }
    return planes;
  }

  getSmallPlanes(): SmallPlane[] {
    let planes: SmallPlane[] = [];

    for (let item in SmallPlane) {
      const plane = SmallPlane[item as SmallPlane];
      if (this.checker(this.generatedNumbers, SmallPlanesDefinition[plane])) {
        planes.push(plane);
      }
    }
    return planes;
  }

  getMissingPlanes(missingNumbers: number[]) {
    let planes: MissingPlane[] = [];

    for (let item in MissingPlane) {
      const plane = MissingPlane[item as MissingPlane];
      if (this.checker(missingNumbers, MissingPlaneDefinition[plane])) {
        planes.push(plane);
      }
    }
    return planes;
  }

  getRelation(n1: number, n2: number): RelationType[] {
    let relation: RelationType[] = [];

    //num1 to num2
    let relationData = RelationDefinition.filter(e => e.Number === n1)[0];
    if(relationData.Friends.includes(n2)) {
      relation.push(RelationType.Friend as RelationType);
    }
    if(relationData.Enemies?.includes(n2)) {
      relation.push(RelationType.Enemy as RelationType);
    }
    if(relationData.Neutrals.includes(n2)) {
      relation.push(RelationType.Neutral as RelationType);
    }
    if(relationData.Temporary_Friend?.includes(n2)) {
      relation.push(RelationType.Temporary_Friend as RelationType);
    }

    return relation;
  }

  getRepeatingNumbers(): number[] {
    let repeatingNumbers: number[] = [];
    for (let i = 1; i <= 9; ++i) {
      let repeatingNumber: number = i;
      for (let j = 1; j < this.generatedNumbers.filter(e => e === i).length; ++j) {
        repeatingNumber += i * Math.pow(10, j);
      }
      if (repeatingNumber > 9) {
        repeatingNumbers.push(repeatingNumber);
      }
    }
    return repeatingNumbers;
  }
}
