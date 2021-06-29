// console.log(444,a)


// async function test1(){
//     return 1
// }

// async function test2(){
//     return Promise.resolve(2)
// }

// const result1 = test1()
// const result2 = test2()
// console.log(result1,result2)

async function test3(){
    const p3 = Promise.reject(3).then(() => {
        console.log(444)
    }).catch((err) => {
        console.log(err)
    });
    const data  = await p3;
    console.log(data)
}

test3()