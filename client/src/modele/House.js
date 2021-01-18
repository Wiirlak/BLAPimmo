import {ethers} from "ethers";

export class House {
    constructor(price, surface, name, address, description, dateUtc, id) {
        this.price = price
        this.surface = surface
        this.name = ethers.utils.parseBytes32String(name)
        this.address = ethers.utils.parseBytes32String(address)
        this.description = description
        this.dateUtc = ethers.utils.parseBytes32String(dateUtc)
        this.id = id
    }

}