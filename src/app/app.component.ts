import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

type EnumDictionary<T extends Planes | SmallPlane, U> = {
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

/*enum MissingPlane {
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
}*/

enum EarthElement {
  Fire = "Fire 🔥",
  Water = "Water 🌊",
  Metal = "Metal 🪙",
  Earth = "Earth 🌍",
  Wood = "Wood 🪵"
}

const EarthElementDefinition: { [id: number]: EarthElement; } = {
  1: EarthElement.Water,
  2: EarthElement.Earth,
  3: EarthElement.Wood,
  4: EarthElement.Wood,
  5: EarthElement.Earth,
  6: EarthElement.Metal,
  7: EarthElement.Metal,
  8: EarthElement.Earth,
  9: EarthElement.Fire
}

enum Color {
  Red = '#ff5252',
  Orange = '#ffab40',
  LimeYellow = '#d4e157',
  Green = '#69f0ae',
  Blue = '#40c4ff',
  DeepBlue = '#448aff',
  Violet = '#e040fb',
  UltraViolet = '#7c4dff',
  Infrared = '#ff4081',
}

const LuShoGridColorDefinition: { [id: number]: Color; } = {
  1: Color.Red,
  2: Color.Orange,
  3: Color.LimeYellow,
  4: Color.Green,
  5: Color.Blue,
  6: Color.DeepBlue,
  7: Color.Violet,
  8: Color.UltraViolet,
  9: Color.Infrared
}

interface Person {
  Name: string;
  Birthday: string;
  Gender: string;
  Psychic: number;
  Destiny: number;
  karmic: number;
  HeartDesire: NameNumber[];
  FirstImpression: NameNumber[];
  CompleteName: NameNumber[];
  Missing: number[];
  Complementary?: MissingComplementary[];
  CompletePlanes: Planes[];
  MissingPlanes?: Planes[];
  SmallPlanes?: SmallPlane[];
  IsFriendlyPsychicDestiny?: RelationType[];
  IsFriendlyDestinyPsychic?: RelationType[];
  Elements?: EarthElement[];
  LuShoGrid: LuShoGrid[];
  KarmicDebt?: number;
  MasterNumber: number[];
  Repeating: number[];
  PersonalYears: PersonalYear[];
}

interface PersonalYear {
  year: number;
  personalYear: number;
}

interface NameNumber {
  Name: string;
  FullNumber: number;
  Number: number;
}

//friendly psychic and destiny
enum RelationType {
  Friend = "Friend",
  Enemy = "Enemy",
  Neutral = "Neutral",
  Temporary_Friend = "Temporary_Friend"
}

interface LuShoGrid {
  id: number;
  number: string;
  color: string;
  planet: string;
  earthElement: string;
}

interface Relation {
  Number: number;
  Friends: number[];
  Enemies?: number[];
  Neutrals: number[];
  Temporary_Friend?: number[];
}

enum Planet {
  Sun = 'Sun | सूर्य',
  Moon = 'Moon | चांद',
  Jupiter = 'Jupiter | बृहस्पति',
  Rahu = 'Rahu | राहु',
  Mercury = 'Mercury | बुध',
  Venus = 'Venus | शुक्र',
  Ketu = 'Ketu | केतु',
  Saturn = 'Saturn | शॉनी',
  Mars = 'Mars | मंगल',
}

const PlanetDefinition: { [id: number]: Planet; } = {
  1: Planet.Sun,
  2: Planet.Moon,
  3: Planet.Jupiter,
  4: Planet.Rahu,
  5: Planet.Mercury,
  6: Planet.Venus,
  7: Planet.Ketu,
  8: Planet.Saturn,
  9: Planet.Mars
}

const RelationDefinition: Relation[] = [
  { Number: 1, Friends: [1, 2, 3, 5, 6, 9], Enemies: [8], Neutrals: [4, 7] },
  { Number: 2, Friends: [1, 2, 3, 5], Enemies: [4, 8, 9], Neutrals: [6, 7] },
  { Number: 3, Friends: [1, 2, 3, 5], Enemies: [6], Neutrals: [4, 7, 8, 9] },
  { Number: 4, Friends: [1, 5, 6, 7], Enemies: [2, 4, 8, 9], Neutrals: [3], Temporary_Friend: [4, 8] },
  { Number: 5, Friends: [1, 2, 3, 5, 6], Neutrals: [4, 7, 8, 9] },
  { Number: 6, Friends: [1, 5, 6, 7], Enemies: [3], Neutrals: [2, 4, 8, 9] },
  { Number: 7, Friends: [1, 3, 4, 5, 6], Neutrals: [2, 7, 8, 9] },
  { Number: 8, Friends: [3, 4, 5, 6, 7, 8], Enemies: [1, 2], Neutrals: [9], Temporary_Friend: [4, 8] },
  { Number: 9, Friends: [1, 3, 5], Enemies: [4, 2], Neutrals: [6, 7, 8, 9] }
]

interface MissingComplementary {
  missingNumber: number;
  complementaryNumber: number[] | string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private formBuilder: FormBuilder) { }

  openDialog(name: string, dob: Date, gender: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '20rem',
      maxWidth: '30rem',
      data: { name: name, dob: dob.toDateString(), gender: gender },
    });

    dialogRef.afterClosed().subscribe(reset => {
      if (reset === true) {
        this.formReset();
      }
    });
  }

  title: string = 'Numerology App';
  defaultDate: Date = new Date('12/31/1996');
  person: Person | undefined;

  userForm = this.formBuilder.group({
    name: '',
    dob: '',
    selectedGender: ''
  });

  genders: DropDown[] = [
    { value: Gender.Male, displayName: Gender[Gender.Male] },
    { value: Gender.Female, displayName: Gender[Gender.Female] },
  ];

  openSnackBar(message: string, action: string = 'Okay') {
    this._snackBar.open(message, action, {
      duration: message.length > 50 ? 30000 : 6000,
    });
  }

  formReset() {
    this.reset();
    this.userForm.reset();
  }

  reset() {
    this._snackBar.dismiss();
    this.person = undefined;
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "Do Numerology Calculations including Lu-Sho Grid.",
        url: window.location.href
      })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing:', error));
    }
  }

  calculate() {
    this.reset();
    if (!this.userForm.value.dob) {
      this.openSnackBar("Please enter a valid birthday");
      return;
    } else if (!this.userForm.value.name || this.userForm.value.name.trim().length < 1) {
      this.openSnackBar("Please enter a valid name");
      return;
    } else if (this.userForm.value.selectedGender != '0' && this.userForm.value.selectedGender != '1') {
      this.openSnackBar("Please choose a gender");
      return;
    }

    const name: string = this.userForm.value.name;
    const dob: Date = new Date(this.userForm.value.dob);
    const gender: Gender = parseInt(this.userForm.value.selectedGender) === 0 ? Gender.Male : Gender.Female;
    const genderAsString: string = this.genders[gender].displayName;

    this.openDialog(name, dob, genderAsString);
    const psychic = this.getPsychic(dob);
    const destiny = this.getDestinyNumber(dob);
    const KuaNumber = this.getKuaNumber(dob, gender);
    const generatedNumbers = this.generateNumbers(dob, psychic, destiny, KuaNumber);

    this.person = {
      Name: name,
      Birthday: dob.toDateString(),
      Gender: genderAsString,
      Psychic: psychic,
      Destiny: destiny,
      karmic: KuaNumber,
      MasterNumber: this.getMasterNumbers(dob),
      KarmicDebt: this.getKarmicDebtNumber(dob),
      FirstImpression: this.getPersonalityNumber(name),
      CompleteName: this.getFullNameNumber(name),
      HeartDesire: this.getHeartDesireNumber(name),
      LuShoGrid: this.initLuShoGrid(generatedNumbers),
      Missing: this.getMissingNumbers(generatedNumbers),
      IsFriendlyPsychicDestiny: this.getRelation(psychic, destiny),
      IsFriendlyDestinyPsychic: this.getRelation(destiny, psychic),
      Repeating: this.getRepeatingNumbers(generatedNumbers),
      CompletePlanes: this.getPlanes(generatedNumbers),
      Elements: this.getEarthElements(generatedNumbers),
      PersonalYears: this.getPersonalYears(dob)
    }
    this.person.Complementary = this.getComplementaryNumbers(this.person.Missing, generatedNumbers);
    this.person.MissingPlanes = this.getMissingPlanes(this.person.Missing);
  }

  initLuShoGrid(generatedNumbers: number[]): LuShoGrid[] {
    let numbers: string[] = [];
    generatedNumbers.forEach(n => {
      if (numbers[n] === undefined) {
        numbers[n] = '';
      }
      numbers[n] += n;
    });
    let luShoGrid: LuShoGrid[] = [];
    [4, 9, 2, 3, 5, 7, 8, 1, 6].forEach(n => {
      luShoGrid.push({ id: n, number: numbers[n], color: LuShoGridColorDefinition[n], planet: PlanetDefinition[n], earthElement: EarthElementDefinition[n] });
    });
    return luShoGrid;
  }

  getPsychic(dob: Date): number {
    return this.getSingleNumber(dob.getDate());
  }

  getSingleNumber(value: number): number {
    return (value - 1) % 9 + 1;
  }

  getMasterNumbers(dob: Date): number[] {
    let masterNumber: number[] = [];

    let date = dob.getDate();
    if (date > 9) {
      if (date === 11 || date === 22 || date === 29) {
        if (date === 29) {
          date = 11;
        }
        masterNumber.push(date);
      }
      date = this.getSingleNumber(date);
    }

    let month = dob.getMonth() + 1;
    if (month === 11) {
      masterNumber.push(month);
    } else if (month > 9) {
      month = this.getSum(month);
    }

    let yearSum = this.getSum(dob.getFullYear());
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
      if (this.isMasterNumber(total)) {
        masterNumber.push(total);
      }
      total = this.getSum(total);
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

  getDestinyNumber(dob: Date): number {
    return this.getSingleNumber(dob.getDate() + dob.getMonth() + 1 + dob.getFullYear());
  }

  getPersonalYears(dob: Date): PersonalYear[] {
    let personalYears: PersonalYear[] = [];
    for (let year = dob.getFullYear(); year <= new Date().getFullYear() + 20; ++year) {
      personalYears.push({ year: year, personalYear: this.getSingleNumber(dob.getDate() + dob.getMonth() + 1 + year) });
    }
    return personalYears;
  }

  getKuaNumber(dob: Date, gender: Gender): number {
    const _year = this.getSingleNumber(dob.getFullYear());
    return this.getSingleNumber(gender === Gender.Male ? 11 - _year : 4 + _year);
  }

  isMasterNumber(date: number): boolean {
    return (date === 11 || date === 22 || date === 33 || date === 44 || date === 55);
  }

  generateNumbers(dob: Date, psychic: number, destiny: number, KuaNumber: number): number[] {
    const date: number = dob.getDate();
    const month: number = dob.getMonth() + 1;
    const year: number = dob.getFullYear();

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

  getMissingNumbers(generatedNumbers: number[]): number[] {
    let missingNos: number[] = [];

    for (let i = 1; i <= 9; ++i) {
      if (generatedNumbers.includes(i) === false) {
        missingNos.push(i);
      }
    }

    return missingNos;
  }

  getPersonalityNumber(name: string): NameNumber[] {
    let hdNum: NameNumber[] = [];
    const fullName: string[] = name.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
    let firstAndMiddleName = fullName.slice(0, -1).join(' ');
    let middleName = fullName.slice(1, -1).join(' ');

    hdNum.push(this.getNameNumberObj(name, this.getConsonantNumber(name.toLowerCase())));
    hdNum.push(this.getNameNumberObj(firstName, this.getConsonantNumber(firstName.toLowerCase())));
    if (firstAndMiddleName !== '' && firstAndMiddleName !== firstName) {
      hdNum.push(this.getNameNumberObj(firstAndMiddleName, this.getConsonantNumber(firstAndMiddleName.toLowerCase())));
    }
    if (middleName !== '' && middleName !== firstAndMiddleName) {
      hdNum.push(this.getNameNumberObj(middleName, this.getConsonantNumber(middleName.toLowerCase())));
    }
    hdNum.push(this.getNameNumberObj(lastName, this.getConsonantNumber(lastName.toLowerCase())));

    return hdNum;
  }

  getHeartDesireNumber(name: string): NameNumber[] {
    let hdNum: NameNumber[] = [];
    const fullName: string[] = name.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
    let firstAndMiddleName = fullName.slice(0, -1).join(' ');
    let middleName = fullName.slice(1, -1).join(' ');

    hdNum.push(this.getNameNumberObj(name, this.getVowelNumber(name.toLowerCase())));
    hdNum.push(this.getNameNumberObj(firstName, this.getVowelNumber(firstName.toLowerCase())));
    if (firstAndMiddleName !== '' && firstAndMiddleName !== firstName) {
      hdNum.push(this.getNameNumberObj(firstAndMiddleName, this.getVowelNumber(firstAndMiddleName.toLowerCase())));
    }
    if (middleName !== '' && middleName !== firstAndMiddleName) {
      hdNum.push(this.getNameNumberObj(middleName, this.getVowelNumber(middleName.toLowerCase())));
    }
    hdNum.push(this.getNameNumberObj(lastName, this.getVowelNumber(lastName.toLowerCase())));

    return hdNum;
  }

  getFullNameNumber(name: string): NameNumber[] {
    let hdNum: NameNumber[] = [];
    const fullName: string[] = name.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
    let firstAndMiddleName = fullName.slice(0, -1).join(' ');
    let middleName = fullName.slice(1, -1).join(' ');

    hdNum.push(this.getNameNumberObj(name, this.getNameNumberFull(name.toLowerCase())));
    hdNum.push(this.getNameNumberObj(firstName, this.getNameNumberFull(firstName.toLowerCase())));
    if (firstAndMiddleName !== '' && firstAndMiddleName !== firstName) {
      hdNum.push(this.getNameNumberObj(firstAndMiddleName, this.getNameNumberFull(firstAndMiddleName.toLowerCase())));
    }
    if (middleName !== '' && middleName !== firstAndMiddleName) {
      hdNum.push(this.getNameNumberObj(middleName, this.getNameNumberFull(middleName.toLowerCase())));
    }
    hdNum.push(this.getNameNumberObj(lastName, this.getNameNumberFull(lastName.toLowerCase())));

    return hdNum;
  }

  getNameNumberObj(_name: string, _number: number): NameNumber {
    return { Name: _name, Number: _number, FullNumber: this.getSingleNumber(_number) };
  }

  getNameNumberFull(name: string): number {
    let sum: number = 0;
    for (const element of name) {
      sum += this.getLetterMap(element);
    }
    return sum;
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
    return sum;
  }

  getConsonantNumber(name: string): number {
    let sum: number = 0;
    for (const element of name) {
      if (!this.isVowel(element)) {
        sum += this.getLetterMap(element);
      }
    }
    return sum;
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

  getComplementaryNumbers(missingNumbers: number[], availableNumbers: number[]): MissingComplementary[] {
    let complementaryNumbers: MissingComplementary[] = [];
    missingNumbers.forEach(element => {

      let cn = this.getComplementaryForMissing(element)
        .filter(e => availableNumbers.includes(e));

      complementaryNumbers.push(
        {
          missingNumber: element,
          complementaryNumber: cn.length > 0 ? cn : 'x'
        });
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

  hasKarmicDebtNumber(dob: Date): boolean {
    switch (dob.getDate()) {
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

  getKarmicDebtNumber(dob: Date): number | undefined {
    if (this.hasKarmicDebtNumber(dob)) {
      return dob.getDate();
    }
    return undefined;
  }

  checker = (arr: number[], target: number[]) => target.every(v => arr.includes(v));
  getPlanes(generatedNumbers: number[]): Planes[] {
    let planes: Planes[] = [];

    for (let item in Planes) {
      const plane = Planes[item as Planes];
      if (this.checker(generatedNumbers, PlanesDefinition[plane])) {
        planes.push(plane);
      }
    }
    return planes;
  }

  getSmallPlanes(generatedNumbers: number[]): SmallPlane[] {
    let planes: SmallPlane[] = [];

    for (let item in SmallPlane) {
      const plane = SmallPlane[item as SmallPlane];
      if (this.checker(generatedNumbers, SmallPlanesDefinition[plane])) {
        planes.push(plane);
      }
    }
    return planes;
  }

  getMissingPlanes(missingNumbers: number[]): Planes[] {
    let planes: Planes[] = [];

    for (let item in Planes) {
      const plane = Planes[item as Planes];
      if (this.checker(missingNumbers, PlanesDefinition[plane])) {
        planes.push(plane);
      }
    }
    return planes;
  }

  getRelation(n1: number, n2: number): RelationType[] {
    let relation: RelationType[] = [];

    //num1 to num2
    let relationData = RelationDefinition.filter(e => e.Number === n1)[0];
    if (relationData.Friends.includes(n2)) {
      relation.push(RelationType.Friend as RelationType);
    }
    if (relationData.Enemies?.includes(n2)) {
      relation.push(RelationType.Enemy as RelationType);
    }
    if (relationData.Neutrals.includes(n2)) {
      relation.push(RelationType.Neutral as RelationType);
    }
    if (relationData.Temporary_Friend?.includes(n2)) {
      relation.push(RelationType.Temporary_Friend as RelationType);
    }

    return relation;
  }

  getRepeatingNumbers(generatedNumbers: number[]): number[] {
    let repeatingNumbers: number[] = [];
    for (let i = 1; i <= 9; ++i) {
      let repeatingNumber: number = i;
      for (let j = 1; j < generatedNumbers.filter(e => e === i).length; ++j) {
        repeatingNumber += i * Math.pow(10, j);
      }
      if (repeatingNumber > 9) {
        repeatingNumbers.push(repeatingNumber);
      }
    }
    return repeatingNumbers;
  }

  getEarthElements(generatedNumbers: number[]): EarthElement[] {
    let earthElement: EarthElement[] = [];
    generatedNumbers.filter((v, i, a) => a.indexOf(v) === i).forEach(n => {
      earthElement.push(EarthElementDefinition[n]);
    });
    return earthElement;
  }

  ConvertNameNumberArrayToString(nameNumber: NameNumber[]): string {
    let str = '';
    nameNumber.forEach(h => {
      str += h.Name + ' (' + h.FullNumber + ':' + h.Number + '); ';
    });
    return str;
  }
  
  ConvertPersonalYearArrayToString(personalYear: PersonalYear[]): string {
    let str = '';
    personalYear.forEach(h => {
      str += h.year + ':' + h.personalYear + '; ';
    });
    return str;
  }

  ConvertMissingComplementaryToString(missingComplementary: MissingComplementary[]): string {
    let str = '';
    missingComplementary.forEach(h => {
      str += '{' + h.missingNumber + ' ~ ' + h.complementaryNumber + '}; ';
    });
    return str;
  }

  IsNameChangeRequired(person: Person): { canChangeTo: number[], comments: string } {
    const possibleNameChangeNumbers = [5, 6, 1, 3];
    const avoidNumbers = [4, 8];
    let canChangeTo: number[] = [];

    const isFriendlyPsychic = this.getRelation(person.Psychic, person.CompleteName[0].FullNumber).includes(RelationType.Friend);
    const isFriendlyDestiny = this.getRelation(person.Destiny, person.CompleteName[0].FullNumber).includes(RelationType.Friend);
    const isFivePresent = !person.Missing.includes(5);
    const isSixPresent = !person.Missing.includes(6);
    const isThreePresent = !person.Missing.includes(3);

    let comments = 'Name is ' + (isFriendlyPsychic ? 'friendly ' : 'not friendly ') + 'with Psychic.\n';
    comments += 'Name is ' + (isFriendlyDestiny ? 'friendly ' : 'not friendly ') + 'with Destiny.\n';

    //if 5 is missing, give 5
    if (possibleNameChangeNumbers.includes(person.CompleteName[0].FullNumber) && isFriendlyPsychic && isFriendlyDestiny) {
      comments += "NAME CHANGE NOT RECOMMENDED as full name is friendly.\n";
    }
    person.CompleteName.forEach(item => {
      if (avoidNumbers.includes(item.FullNumber)) {
        comments += item.Name + " includes numbers that should be avoided (4, 8). Recommend Name Change.";
      }
    });

    if (person.CompleteName[0].FullNumber !== 5 && !isFivePresent) {
      canChangeTo.push(5);
      comments += "NAME CHANGE to 5 if needed.\n";
    }
    if (person.CompleteName[0].FullNumber !== 6 && !isSixPresent && (person.Psychic !== 3 && person.Destiny !== 3)) {
      canChangeTo.push(6);
      comments += "NAME CHANGE to 6 if needed.\n";
    }
    if (person.CompleteName[0].FullNumber !== 3 && !isThreePresent && (person.Psychic !== 6 && person.Destiny !== 6)) {
      canChangeTo.push(3);
      comments += "NAME CHANGE to 3 if needed.\n";
    }
    if (person.CompleteName[0].FullNumber !== 1 && person.Missing.includes(1) && isFivePresent && isSixPresent && (person.Psychic !== 8 && person.Destiny !== 8)) {
      canChangeTo.push(1);
      comments += "NAME CHANGE to 1 if needed.\n";
    }
    return { canChangeTo, comments };
  }

  changeNameSuggestions(person: Person): string {
    const IsNameChangeRequired = this.IsNameChangeRequired(person);
    let comments: string = '';

    if (IsNameChangeRequired.canChangeTo.length === 0) {
      return '[FINAL COMMENT: No name change needed.]';
    }

    IsNameChangeRequired.canChangeTo.forEach(n => {
      [n - person.CompleteName[0].FullNumber, person.CompleteName[0].FullNumber - n].forEach(diff => {
        comments += '{ =' + n + ': ' + (diff > 0 ? ' [add letters] ' : ' [remove letters] ');
        switch (Math.abs(diff)) {
          case 1:
            comments += 'a, i, j, q, y';
            break;
          case 2:
            comments += 'b, k, r';
            break;
          case 3:
            comments += 's, c, g, l';
            break;
          case 4:
            comments += 'd, m, t';
            break;
          case 5:
            comments += 'n, e, h, x';
            break;
          case 6:
            comments += 'u, v, w';
            break;
          case 7:
            comments += 'o, z';
            break;
          case 8:
            comments += 'f, p';
            break;
        }
        comments += ' } (OR) ';
      });
    });

    return comments;
  }
}

export interface DialogData {
  name: string;
  dob: string;
  gender: string;
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  confirm(): void {
    this.dialogRef.close();
  }
}