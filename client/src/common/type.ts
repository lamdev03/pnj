export interface IProduct {
    _id?: number
    name: string
    price: number,
    image:string,
    category:string,
    desc:string,
    quality: number
}
export interface ICategory{
    _id?:number,
    name:string,
    slug:string
}
