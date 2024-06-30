let dialog = require("dialog");
let submenu = require("submenu");
let textbox = require("textbox");

// Meal options
let mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

// Recipes with detailed ingredients and steps
let recipes = {
    "Breakfast": [
        { 
            name: "Pancakes", 
            ingredients: [
                "125g (1 cup) Flour",
                "1 large Egg",
                "240ml (1 cup) Milk",
                "2 tbsp Sugar",
                "2 tsp Baking Powder",
                "Pinch of Salt"
            ], 
            steps: [
                "In a large bowl, mix the flour, sugar, baking powder, and salt.",
                "In another bowl, beat the egg and then whisk in the milk.",
                "Pour the wet ingredients into the dry ingredients and stir until just combined. Don't overmix.",
                "Heat a lightly oiled griddle or frying pan over medium-high heat.",
                "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.",
                "Brown on both sides and serve hot with syrup."
            ] 
        },
        { 
            name: "Omelette", 
            ingredients: [
                "2 large Eggs",
                "30ml (2 tbsp) Milk",
                "30g (1 oz) Cheese, grated",
                "Salt and Pepper to taste",
                "Butter or Oil for cooking"
            ], 
            steps: [
                "Crack the eggs into a bowl, add the milk, and season with salt and pepper.",
                "Beat the mixture with a fork until well combined.",
                "Heat a non-stick frying pan over medium heat and add a knob of butter or a small amount of oil.",
                "Pour in the egg mixture and tilt the pan to spread it out evenly.",
                "As the eggs begin to set, sprinkle the cheese over the omelette.",
                "Fold the omelette in half and slide it onto a plate. Serve immediately."
            ] 
        },
        { 
            name: "French Toast", 
            ingredients: [
                "2 slices of Bread",
                "2 large Eggs",
                "60ml (1/4 cup) Milk",
                "1 tsp Vanilla Extract",
                "1 tsp Cinnamon",
                "Butter for cooking",
                "Syrup for serving"
            ], 
            steps: [
                "In a shallow bowl, whisk together the eggs, milk, vanilla extract, and cinnamon.",
                "Heat a skillet over medium heat and add butter.",
                "Dip each slice of bread into the egg mixture, ensuring both sides are coated.",
                "Place the bread in the skillet and cook until golden brown on both sides.",
                "Serve hot with syrup."
            ] 
        },
        // Add more breakfast recipes here (total 20)
    ],
    "Lunch": [
        { 
            name: "Sandwich", 
            ingredients: [
                "2 slices of Bread",
                "1 leaf of Lettuce",
                "1 slice of Tomato",
                "1 slice of Cheese",
                "2 slices of Ham"
            ], 
            steps: [
                "Place the slices of bread on a clean surface.",
                "Layer the lettuce, tomato, cheese, and ham on one slice of bread.",
                "Top with the second slice of bread.",
                "Cut the sandwich in half and serve."
            ] 
        },
        { 
            name: "Salad", 
            ingredients: [
                "100g (2 cups) Lettuce, chopped",
                "1 Tomato, diced",
                "1/2 Cucumber, sliced",
                "60ml (1/4 cup) Dressing of your choice"
            ], 
            steps: [
                "In a large bowl, combine the lettuce, tomato, and cucumber.",
                "Pour the dressing over the salad.",
                "Toss to combine and serve immediately."
            ] 
        },
        { 
            name: "Burger", 
            ingredients: [
                "200g (7 oz) Ground Beef",
                "1 Burger Bun",
                "1 slice of Cheese",
                "Lettuce, Tomato, Onion",
                "Ketchup, Mustard"
            ], 
            steps: [
                "Form the ground beef into a patty and season with salt and pepper.",
                "Cook the patty in a skillet over medium heat until desired doneness.",
                "Toast the bun in the skillet.",
                "Assemble the burger with lettuce, tomato, onion, cheese, and condiments.",
                "Serve hot."
            ] 
        },
        // Add more lunch recipes here (total 20)
    ],
    "Dinner": [
        { 
            name: "Spaghetti", 
            ingredients: [
                "200g (7 oz) Spaghetti",
                "400g (14 oz) Tomato Sauce",
                "2 cloves Garlic, minced",
                "200g (7 oz) Ground Beef",
                "Salt and Pepper to taste",
                "Parmesan Cheese for serving"
            ], 
            steps: [
                "Cook the spaghetti according to the package instructions until al dente. Drain and set aside.",
                "In a large pan, cook the ground beef over medium heat until browned.",
                "Add the minced garlic and cook for another minute.",
                "Stir in the tomato sauce and let it simmer for 10-15 minutes.",
                "Season with salt and pepper to taste.",
                "Serve the sauce over the spaghetti and sprinkle with Parmesan cheese."
            ] 
        },
        { 
            name: "Steak", 
            ingredients: [
                "1 Steak (about 225g or 8 oz)",
                "Salt and Pepper to taste",
                "1 tbsp Olive Oil or Butter"
            ], 
            steps: [
                "Season the steak on both sides with salt and pepper.",
                "Heat a frying pan over high heat and add the olive oil or butter.",
                "Once the pan is very hot, add the steak and cook for 3-4 minutes on each side for medium-rare, or longer if desired.",
                "Remove the steak from the pan and let it rest for a few minutes before serving."
            ] 
        },
        { 
            name: "Chicken Curry", 
            ingredients: [
                "500g (1 lb) Chicken Breast, cubed",
                "1 Onion, diced",
                "2 cloves Garlic, minced",
                "1 tbsp Curry Powder",
                "400ml (1 can) Coconut Milk",
                "Salt and Pepper to taste"
            ], 
            steps: [
                "Heat oil in a large pan over medium heat.",
                "Add the onion and garlic, and cook until softened.",
                "Stir in the curry powder and cook for another minute.",
                "Add the chicken and cook until browned.",
                "Pour in the coconut milk and let it simmer for 20 minutes.",
                "Season with salt and pepper to taste.",
                "Serve hot with rice."
            ] 
        },
        // Add more dinner recipes here (total 20)
    ],
    "Snack": [
        { 
            name: "Smoothie", 
            ingredients: [
                "1 Banana",
                "150g (1 cup) Mixed Berries",
                "240ml (1 cup) Yogurt",
                "1 tbsp Honey"
            ], 
            steps: [
                "Peel the banana and add it to a blender with the mixed berries, yogurt, and honey.",
                "Blend until smooth.",
                "Pour into a glass and serve immediately."
            ] 
        },
        { 
            name: "Popcorn", 
            ingredients: [
                "100g (1/2 cup) Corn Kernels",
                "2 tbsp Oil",
                "Salt to taste"
            ], 
            steps: [
                "Heat the oil in a large pot over medium-high heat.",
                "Add the corn kernels and cover the pot with a lid.",
                "Shake the pot occasionally to prevent the kernels from burning.",
                "Once the popping slows down, remove the pot from the heat.",
                "Season the popcorn with salt and serve."
            ] 
        },
        { 
            name: "Bruschetta", 
            ingredients: [
                "1 Baguette, sliced",
                "2 Tomatoes, diced",
                "1 clove Garlic, minced",
                "2 tbsp Olive Oil",
                "Salt and Pepper to taste",
                "Fresh Basil for garnish"
            ], 
            steps: [
                "Preheat the oven to 200°C (400°F).",
                "Arrange the baguette slices on a baking sheet and toast in the oven until golden brown.",
                "In a bowl, combine the tomatoes, garlic, olive oil, salt, and pepper.",
                "Spoon the tomato mixture onto the toasted baguette slices.",
                "Garnish with fresh basil and serve immediately."
            ] 
        },
        // Add more snack recipes here (total 20)
    ],
    "Dessert": [
        { 
            name: "Chocolate Cake", 
            ingredients: [
                "200g (1 cup) Sugar",
                "175g (3/4 cup) Flour",
                "75g (3/4 cup) Cocoa Powder",
                "1.5 tsp Baking Powder",
                "1.5 tsp Baking Soda",
                "1 tsp Salt",
                "2 large Eggs",
                "240ml (1 cup) Milk",
                "120ml (1/2 cup) Vegetable Oil",
                "2 tsp Vanilla Extract",
                "240ml (1 cup) Boiling Water"
            ], 
            steps: [
                "Preheat your oven to 175°C (350°F). Grease and flour two 9-inch round baking pans.",
                "In a large bowl, stir together the sugar, flour, cocoa, baking powder, baking soda, and salt.",
                "Add the eggs, milk, oil, and vanilla. Beat on medium speed for 2 minutes.",
                "Stir in the boiling water. The batter will be thin.",
                "Pour the batter into the prepared pans.",
                "Bake for 30-35 minutes, or until a toothpick inserted into the center comes out clean.",
                "Cool in the pans for 10 minutes, then remove to wire racks to cool completely."
            ] 
        },
        { 
            name: "Cheesecake", 
            ingredients: [
                "200g (2 cups) Graham Cracker Crumbs",
                "100g (1/2 cup) Butter, melted",
                "900g (32 oz) Cream Cheese, softened",
                "200g (1 cup) Sugar",
                "240ml (1 cup) Sour Cream",
                "1 tsp Vanilla Extract",
                "3 large Eggs"
            ], 
            steps: [
                "Preheat your oven to 175°C (350°F).",
                "Mix the graham cracker crumbs and melted butter in a bowl. Press the mixture into the bottom of a 9-inch springform pan.",
                "In a large bowl, beat the cream cheese and sugar until smooth.",
                "Blend in the sour cream and vanilla.",
                "Add the eggs one at a time, beating just until blended. Pour the filling over the crust.",
                "Bake for 55-60 minutes, or until the center is almost set. Run a knife around the edge of the pan to loosen the cheesecake.",
                "Cool before removing the rim of the pan. Refrigerate for 4 hours before serving."
            ] 
        },
        { 
            name: "Tiramisu", 
            ingredients: [
                "6 large Egg Yolks",
                "150g (3/4 cup) Sugar",
                "480ml (2 cups) Mascarpone Cheese",
                "360ml (1.5 cups) Heavy Cream",
                "240ml (1 cup) Coffee, cooled",
                "60ml (1/4 cup) Coffee Liqueur",
                "2 packages Ladyfinger Cookies",
                "Cocoa Powder for dusting"
            ], 
            steps: [
                "In a large bowl, whisk the egg yolks and sugar until thick and pale. Fold in the mascarpone cheese.",
                "In another bowl, beat the heavy cream until stiff peaks form. Gently fold the whipped cream into the mascarpone mixture.",
                "Combine the coffee and coffee liqueur in a shallow dish. Dip each ladyfinger into the coffee mixture for a few seconds, ensuring both sides are moistened.",
                "Arrange a layer of soaked ladyfingers in the bottom of a 9x13 inch dish.",
                "Spread half of the mascarpone mixture over the ladyfingers.",
                "Repeat with another layer of soaked ladyfingers and the remaining mascarpone mixture.",
                "Cover and refrigerate for at least 4 hours or overnight.",
                "Dust with cocoa powder before serving."
            ] 
        },
        // Add more dessert recipes here (total 20)
    ]
};

// Intro screen
function showIntroScreen() {
    let introMessage = "Flipper's Cookbook";
    dialog.message(introMessage, "Press OK to continue");
}

// Step 1: Choose meal type
function chooseMealType() {
    submenu.setHeader("Select a meal type:");
    for (let i = 0; i < mealTypes.length; i++) {
        submenu.addItem(mealTypes[i], i);
    }
    let result = submenu.show();
    return result !== undefined ? mealTypes[result] : null;
}

// Step 2: Choose meal from suggestions
function chooseMeal(mealType) {
    submenu.setHeader("Select a meal:");
    let meals = recipes[mealType];
    for (let i = 0; i < meals.length; i++) {
        submenu.addItem(meals[i].name, i);
    }
    let result = submenu.show();
    return result !== undefined ? meals[result] : null;
}

// Step 3: Display ingredients and recipe steps together
function displayIngredientsAndRecipe(recipe) {
    textbox.setConfig("start", "text");
    textbox.clearText();
    textbox.addText("**Ingredients:**\n\n");
    for (let i = 0; i < recipe.ingredients.length; i++) {
        textbox.addText("- " + recipe.ingredients[i] + "\n");
    }
    textbox.addText("\n**Recipe:**\n\n");
    for (let i = 0; i < recipe.steps.length; i++) {
        textbox.addText(to_string(i + 1) + ". " + recipe.steps[i] + "\n");
    }
    textbox.show();
    while (textbox.isOpen()) {
        delay(500);
    }
}

// Main function to run the app
function runApp() {
    showIntroScreen();
    while (true) {
        let mealType = chooseMealType();
        if (!mealType) break;
        let meal = chooseMeal(mealType);
        if (!meal) continue;

        // Display ingredients and recipe steps together
        displayIngredientsAndRecipe(meal);
    }
}

// Run the app
runApp();
