export const dateStrToDate = (dateStr: string) : string=>{
        const dateConvStr = dateStr.split('/')
        .reverse().join('-');
        const date = dateConvStr + " 00:00:00"
        
        return date
    }
export const dateDateToStr = (date: Date) : string => {

    const dia = addCaracterEsquerdaUmaStr(date.getDay().toString(), '0', 2);
    const dia1 = addCaracterEsquerdaUmaStr(date.getDate().toString(), '0', 2);
    const mes = addCaracterEsquerdaUmaStr((date.getMonth()+1).toString(), '0', 2);
    const ano = addCaracterEsquerdaUmaStr(date.getFullYear().toString(), '0', 4);
    const hora = addCaracterEsquerdaUmaStr(date.getHours().toString(), '0', 2);
    const min = addCaracterEsquerdaUmaStr(date.getMinutes().toString(), '0', 2);
    const sec = addCaracterEsquerdaUmaStr(date.getSeconds().toString(), '0', 2);
    // const milsec = addCaracterEsquerdaUmaStr(date.getMilliseconds().toString(), '0', 2);
    const milsec = date.getMilliseconds().toString();
     
     return `${ano}/${mes}/${dia1} ${hora}:${min}:${sec}`

}
export const addCaracterEsquerdaUmaStr = (str: string, caracter: string, tamanho: number) => {
    let strAdd = '';
    for(let i = 1; i < tamanho; i++){
        strAdd = strAdd + caracter;
    }
    return strAdd.substr(0, tamanho - str.length) + str;
}
export const sleep = (delay: number) => {
    // var start = new Date().getTime();
    // while (new Date().getTime() < start + delay);
    
    const myFunction = (): boolean => {
        console.log('Pausando a execução');
        return true
    }
    setTimeout(()=>myFunction(), delay);
}
export class Function {
    dateStrToDate(dateStr: string) : Date {
        
        const dateConvStr = dateStr.split('/').reverse().join('-');
        const dateConv = Date.parse(dateConvStr)

        return new Date(dateConv)
    }
    
}