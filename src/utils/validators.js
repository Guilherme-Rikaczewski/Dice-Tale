exports.isIdInvalid = (id)=>{
    return isNaN(id) || Number(id) <= 0
}

exports.notExist = (register)=>{
    return !register
}

exports.isCodeInvalid = (code)=>{
    return code.length != 6
}