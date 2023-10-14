const { default: BigNumber } = require("bignumber.js")

const processQuery=(data,query)=>{

    const page=Number(query?.page??1)
    const limit=Number(query?.limit??20)

    const amountQuery=page*limit
    const arr=[]
    let totalPage=new BigNumber(data.length).dividedBy(Number(limit)).toNumber()

    if(totalPage <=1){
        totalPage=1
    }

    if(!(new BigNumber(totalPage).isInteger())){
        totalPage =new BigNumber(new BigNumber(totalPage).toFixed(0)).toNumber()
    }

    data.forEach((item,index)=>{
        if(page===1){
            if(index <limit){
                arr.push(item)
            }
        }else{
            if(index >=(limit*(page-1)) && index <= amountQuery){
                arr.push(item)
            }
        }
    })

    return {
        data:arr,
        totalPage,
        page,  
    }
}
module.exports={
    processQuery
}