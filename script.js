
	var model = {
		currentCat: null,
		cats: [
		{	
			count: 0,
			catName: 'Catty',
			catImgSrc: 'Catty.jpg'
		},
		{
			count: 0,
			catName: 'Pushy',
			catImgSrc: 'Pushy.jpg'
		},
		{
			count: 0,
			catName: 'Meowth',
			catImgSrc: 'Meowth.jpg'
		},
		{
			count: 0,
			catName: 'Syndy',
			catImgSrc: 'Syndy.jpg'
		},
		{
			count: 0,
			catName: 'Tom',
			catImgSrc: 'Tom.jpg'
		}],
		showHide: function() {
			if(document.getElementById('edit')!== "none") {
				document.getElementById('edit') = "none";
			}
			else{
				document.getElementById('edit') = "block";
			}
		}

	};

	var octopus = {
		init: function() {
			//sets our current cat to the first one in the list
			model.currentCat = model.cats[0];
			catListView.init();
			catView.init();
		},

		getCurrentCat: function() {
			return model.currentCat;
		},

		getCats: function() {
			return model.cats;
		},

		//sets the passed object to the current cat 
		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		//increaments the current cats count
		increamentCount: function() {
			model.currentCat.count++;
		},

		openAdminView: function() {
			return model.showHide;
		},

		closeAdminView: function() {
			return model.showHide;
		},

		updateCurrentCat: function() {
			//help me here
		}
	};

	var catView = {
		init: function() {
			//init only gets called once
			//stores pointers to DOM element for easy access later
			this.cat = document.getElementById('cats');
			this.catName = document.getElementById('cat-name');
			this.catImg = document.getElementById('cat-img');
			this.catCount = document.getElementById('cat-count');

			//calls the click counter whenever a cat image is clicked
			this.catImg.addEventListener('click', function(e) {
				octopus.increamentCount();
				catView.render();
			});
		},

		//render gets called over and over
		render: function() {
			var currentCat = octopus.getCurrentCat();
			this.catName.textContent = currentCat.catName;
			this.catImg.src = currentCat.catImgSrc;
			this.catCount.textContent = currentCat.count;
		}
	}; 

	var catListView = {
		init: function() {
			this.catList = document.getElementById('cat-list');
			this.render();
		},

		render: function() {
			//gets the arry of all the cats
			var cats = octopus.getCats();
			this.catList.innerHtml = '';

			for (var i = 0; i < cats.length; i++) {
				//sets one cat from the array
				var cat = cats[i];
				//creates a list elem
				var elem = document.createElement('li');
				//appends the cat name to it
				elem.textContent = cat.catName;

				//on click, set current cat and render the cat view
				//this closure-in-a-loop is use to connect the view of caat variable to click event
				elem.addEventListener('click', (function(cat) {
					return function() {
						octopus.setCurrentCat(cat);
						catView.render();
					};
				})(cat));
				this.catList.appendChild(elem);
			};
		}
	};

	//kindly review if this is correct
	var adminView = {
		init: function() {
			this.adminButton = document.getElementById('admin-button');
			this.save = document.getElementById('save');
			this.names = document.getElementById('name');
			this.image = document.getElementById('image');
			this.clicks = document.getElementById('clicks');
			this.cancel = document.getElementById('cancel');

			this.adminButton.addEventListener('click', function(e) {
				octopus.openAdminView();
			});

			this.save.addEventListener('click', function(e) {
				//and here as well
			});

			this.cancel.addEventListener('click', function(e) {
				octopus.closeAdminView();
			});
		},

		render: function() {
			this.save.addEventListener('click', function(e) {
				octopus.setCurrentCat(this.names.value);
			})
		}
	};
	octopus.init();