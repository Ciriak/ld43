// Mapping with:

// - Single index for putTileAt

// - Array of weights for weightedRandomize

// - Array or 2D array for putTilesAt

export const TILE_MAPPING = {
    BLANK: 7,
    TRANSPARENT: 8,
    WALL: {
  
      TOP_LEFT: 74,
  
      TOP_RIGHT: 75,
  
      BOTTOM_RIGHT: 76,
  
      BOTTOM_LEFT: 77,
  
      // Let's add some randomization to the walls while we are refactoring:
  
      TOP: [{ index: 65, weight: 4 }, { index: [69,67, 70, 72], weight: 1 }],
  
      LEFT: [{ index: 71, weight: 4 }, { index: [73,68], weight: 1 }],
  
      RIGHT: [{ index: 68, weight: 4 }, { index: [66,73], weight: 1 }],
  
      BOTTOM: [{ index: 65, weight: 4 }, { index: [69,67, 70, 72], weight: 1 }]
  
    },
  
    FLOOR: [{ index: [52, 53 ,54, 59], weight: 9 }, { index: [55, 56, 57, 58], weight: 1 }],
  
    POT: [{ index: 32, weight: 1 }, { index: 33, weight: 1 }, { index: 34, weight: 1 }],
  
    DOOR: {
  
      TOP: [28],
  
      LEFT: [
        [27]
      ],
  
      BOTTOM: [29],
  
      RIGHT: [
        [26]
      ]
  
    },
  
    CHEST: 166,
  
    STAIRS: 81,
  
    TOWER: [
  
      [186],
  
      [205]
  
    ]
  
  };
  
  
  
  export default TILE_MAPPING;