export function holder(address){
    console.log("holder transformation")
    console.log(address)
    if (address == "0x25895eB717B6Bb602b90475b39a738E997Fd95c0"){
        console.log("Is Roberto Alma")
        return "Avv. Roberto Alma ("+ address +")";
    }
    else if (address == "0x98Ce6cC60CbfA3104104CD83B479F639C9d66aE9"){
        console.log("Is Lorenzo Piatti")
        return "Avv. Lorenzo Piatti ("+ address +")";
    }
    else {
            console.log("is default case")
            return address;
    }
}
