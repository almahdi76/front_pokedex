export default class Pokemon {
  id: number;
  name: string;
  hp: number;
  cp: number;
  picture: string;
  types: Array<number>;

  constructor(
    id: number,
    name: string,
    hp: number,
    cp: number,
    picture: string,
    types: Array<number>
  ) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.cp = cp;
    this.picture = picture;
    this.types = types;
  }
}
