export type WeightHistory = {
  catId?: number,
  weight: number,
  createdAt: string
}
export type Cat = {
  id?: number,
  name: string,
  age: number,
  img: string,
  weightHistories?: WeightHistory[]
  createdAt?: string,
  updatedAt?: string
}
export enum Action {
  CREATE, UPDATE
}