
//////////////////////////////////////////////////////////////

/*
	Get Inventory Status
		@id => MongoDB _id
		@type => 0 -> "Smiley", 1 -> "Sticker"
		@qty => $QTY_LEFT$ : integer
*/


//////////////////////////////////////////////////////////////

Request: GET $URL$/product

=> [

		{
				id: "5609a0bca532d7c7c97ef738",
				type: 1,
				qty: 103
		},
		{
				id: "5609a0b3a532d7c7c97ef715",
				type: 0,
				qty: 143
		},
		{
				id: "5609a0b3a532d7c7c97ef725",
				type: 1,
				qty: 0
		},
		{
				id: "5609a0b3a532d7c7c97ef732",
				type: 1,
				qty: 13
		}

]

//////////////////////////////////////////////////////////////

Request: GET $URL$/product?type=1

=> [

		{
				id: "5609a0bca532d7c7c97ef738",
				type: 1,
				qty: 103
		},
		{
				id: "5609a0b3a532d7c7c97ef725",
				type: 1,
				qty: 0
		},
		{
				id: "5609a0b3a532d7c7c97ef732",
				type: 1,
				qty: 13
		}

]

//////////////////////////////////////////////////////////////

Request: GET $URL$/product/$:id$

=>  {
		id: $:id$,
		type: 1,
		qty: 103
	}


//////////////////////////////////////////////////////////////

/*
		Add more items to a product
*/

Request: GET $URL$/product/update/$:id$?qty=500

OR

Request: POST $URL$/product/update/$:id$
   data: {
   			qty:500
   		 }


=>  {
		id: $:id$,
		type: 1,
		qty: 500
	}


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

/*
	Get Orders
		@id => MongoDB _id
		@teamName => Name of the team : string
		@smileyOne => $PRODUCT_OBJ$ : JSON
		@smileyTwo => $PRODUCT_OBJ$ : JSON
		@stickerOne => $PRODUCT_OBJ$ : JSON
		@stickerTwo => $PRODUCT_OBJ$ : JSON
		@done => show if order is done : boolean -> defaultsTo: false
*/

//////////////////////////////////////////////////////////////

Request: GET $URL$/order?done=false

=>  [

		{
				id: "5609a0bca532d7c7c97ef123",
				teamName: "BigBang"
				smileyOne: {
					id: "5609a0bca532d7c7c97ef733",
					type: 0,
					qty: 103
				},
				smileyTwo: {
					id: "5609a0bca532d7c7c97ef718",
					type: 0,
					qty: 103
				},
				stickerOne: {
					id: "5609a0bca532d7c7c97ef734",
					type: 1,
					qty: 103
				},
				stickerTwo: {
					id: "5609a0bca532d7c7c97ef728",
					type: 1,
					qty: 103
				},
				done: false
		},
		{
				id: "5609a0bca532d7c7c97ef133",
				teamName: "UnsolvableSolutions"
				smileyOne: {
					id: "5609a0bca532d7c7c97ef238",
					type: 0,
					qty: 103
				},
				smileyTwo: {
					id: "5609a0bca532d7c7c97ef728",
					type: 0,
					qty: 13
				},
				stickerOne: {
					id: "5609a0bca532d7c7c97ef732",
					type: 1,
					qty: 103
				},
				stickerTwo: {
					id: "5609a0bca532d7c7c97ef438",
					type: 1,
					qty: 10
				},
				done: false
		}
]


//////////////////////////////////////////////////////////////

*Set order done

Request: GET $URL$/order/update/$:id$?done=false

OR

Request: POST $URL$/order/update/$:id$
   data: {
   			done:true
   		 }

=>  {

	id: $:id$,
	teamName: "UnsolvableSolutions"
	smileyOne: "5609a0bca532d7c7c97ef238",
	smileyTwo: "5609a0bca532d7c7c97ef728",
	stickerOne: "5609a0bca532d7c7c97ef732",
	stickerTwo: "5609a0bca532d7c7c97ef438",
	done: true
}

//////////////////////////////////////////////////////////////

*Place an order

Request: POST $URL$/order/create
   data: {
   				teamName: "UnsolvableSolutions",
	   			smileyOne: "5609a0bca532d7c7c97ef238",
				smileyTwo: "5609a0bca532d7c7c97ef728",
				stickerOne: "5609a0bca532d7c7c97ef732",
				stickerTwo: "5609a0bca532d7c7c97ef438"
   		 }

=>  {

	id: "5609a0bca532d7c7c97ef456",
	teamName: "UnsolvableSolutions",
	smileyOne: "5609a0bca532d7c7c97ef238",
	smileyTwo: "5609a0bca532d7c7c97ef728",
	stickerOne: "5609a0bca532d7c7c97ef732",
	stickerTwo: "5609a0bca532d7c7c97ef438",
	done: false
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/*
	Take picture
		@id => MongoDB _id
		@order => $ORDER_ID$ : MongoDB _id
		@url => Picture URL : string
*/

Request: POST $URL$/photo/create
   data: {
	   			order: "5609a0bca532d7c7c97ef238"
   		 }

=>  {
	
	id: "5609a0bca532d7c7c97ef456",
	order: "5609a0bca532d7c7c97ef238",
	url: "/images/hd/5609a0bca532d7c7c97ef456.png"
}

//////////////////////////////////////////////////////////////