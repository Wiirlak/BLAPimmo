import {ethers} from "ethers";

export class House {
    constructor(price, surface, name, address, description) {
        this.price = price
        this.surface = surface
        this.name = ethers.utils.parseBytes32String(name)
        this.address = ethers.utils.parseBytes32String(address)
        this.description = description
    }

}