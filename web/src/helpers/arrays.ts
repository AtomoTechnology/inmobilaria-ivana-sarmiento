export const removeDuplicates = (arr: [], key: string) => {
  return arr.filter((obj, index, self) => index === self.findIndex((t) => t[key] === obj[key]));
};

export const sortArrayByNumericKey = (array: any, key: string) => {
  return array.sort((a:any, b:any) => a[key] - b[key!]);
};


export const bookNumberAndChapters : {book_number: number,chapters :number}[]=  [
        {
            "book_number": 10,
            "chapters": 50
        },
        {
            "book_number": 20,
            "chapters": 40
        },
        {
            "book_number": 30,
            "chapters": 27
        },
        {
            "book_number": 40,
            "chapters": 36
        },
        {
            "book_number": 50,
            "chapters": 34
        },
        {
            "book_number": 60,
            "chapters": 24
        },
        {
            "book_number": 70,
            "chapters": 21
        },
        {
            "book_number": 80,
            "chapters": 4
        },
        {
            "book_number": 90,
            "chapters": 31
        },
        {
            "book_number": 100,
            "chapters": 24
        },
        {
            "book_number": 110,
            "chapters": 22
        },
        {
            "book_number": 120,
            "chapters": 25
        },
        {
            "book_number": 130,
            "chapters": 29
        },
        {
            "book_number": 140,
            "chapters": 36
        },
        {
            "book_number": 150,
            "chapters": 10
        },
        {
            "book_number": 160,
            "chapters": 13
        },
        {
            "book_number": 190,
            "chapters": 10
        },
        {
            "book_number": 220,
            "chapters": 42
        },
        {
            "book_number": 230,
            "chapters": 150
        },
        {
            "book_number": 240,
            "chapters": 31
        },
        {
            "book_number": 250,
            "chapters": 12
        },
        {
            "book_number": 260,
            "chapters": 8
        },
        {
            "book_number": 290,
            "chapters": 66
        },
        {
            "book_number": 300,
            "chapters": 52
        },
        {
            "book_number": 310,
            "chapters": 5
        },
        {
            "book_number": 330,
            "chapters": 48
        },
        {
            "book_number": 340,
            "chapters": 12
        },
        {
            "book_number": 350,
            "chapters": 14
        },
        {
            "book_number": 360,
            "chapters": 3
        },
        {
            "book_number": 370,
            "chapters": 9
        },
        {
            "book_number": 380,
            "chapters": 1
        },
        {
            "book_number": 390,
            "chapters": 4
        },
        {
            "book_number": 400,
            "chapters": 7
        },
        {
            "book_number": 410,
            "chapters": 3
        },
        {
            "book_number": 420,
            "chapters": 3
        },
        {
            "book_number": 430,
            "chapters": 3
        },
        {
            "book_number": 440,
            "chapters": 2
        },
        {
            "book_number": 450,
            "chapters": 14
        },
        {
            "book_number": 460,
            "chapters": 4
        },
        {
            "book_number": 470,
            "chapters": 28
        },
        {
            "book_number": 480,
            "chapters": 16
        },
        {
            "book_number": 490,
            "chapters": 24
        },
        {
            "book_number": 500,
            "chapters": 21
        },
        {
            "book_number": 510,
            "chapters": 28
        },
        {
            "book_number": 520,
            "chapters": 16
        },
        {
            "book_number": 530,
            "chapters": 16
        },
        {
            "book_number": 540,
            "chapters": 13
        },
        {
            "book_number": 550,
            "chapters": 6
        },
        {
            "book_number": 560,
            "chapters": 6
        },
        {
            "book_number": 570,
            "chapters": 4
        },
        {
            "book_number": 580,
            "chapters": 4
        },
        {
            "book_number": 590,
            "chapters": 5
        },
        {
            "book_number": 600,
            "chapters": 3
        },
        {
            "book_number": 610,
            "chapters": 6
        },
        {
            "book_number": 620,
            "chapters": 4
        },
        {
            "book_number": 630,
            "chapters": 3
        },
        {
            "book_number": 640,
            "chapters": 1
        },
        {
            "book_number": 650,
            "chapters": 13
        },
        {
            "book_number": 660,
            "chapters": 5
        },
        {
            "book_number": 670,
            "chapters": 5
        },
        {
            "book_number": 680,
            "chapters": 3
        },
        {
            "book_number": 690,
            "chapters": 5
        },
        {
            "book_number": 700,
            "chapters": 1
        },
        {
            "book_number": 710,
            "chapters": 1
        },
        {
            "book_number": 720,
            "chapters": 1
        },
        {
            "book_number": 730,
            "chapters": 22
        }
    ]