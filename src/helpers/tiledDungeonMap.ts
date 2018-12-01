// Mapping with:

// - Single index for putTileAt

// - Array of weights for weightedRandomize

// - Array or 2D array for putTilesAt

export const TILE_MAPPING = {
    BLANK: 7,
    WALL: {
  
      TOP_LEFT: 30,
  
      TOP_RIGHT: 30,
  
      BOTTOM_RIGHT: 30,
  
      BOTTOM_LEFT: 30,
  
      // Let's add some randomization to the walls while we are refactoring:
  
      TOP: [{ index: 30, weight: 4 }, { index: [31, 32, 33], weight: 1 }],
  
      LEFT: [{ index: 30, weight: 4 }, { index: [31, 32, 33], weight: 1 }],
  
      RIGHT: [{ index: 30, weight: 4 }, { index: [31, 32, 33], weight: 1 }],
  
      BOTTOM: [{ index: 30, weight: 4 }, { index: [31, 32, 33], weight: 1 }]
  
    },
  
    FLOOR: [{ index: [10], weight: 9 }, { index: [12, 15, 16], weight: 1 }, { index: [17, 11], weight: 0.3 }],
  
    POT: [{ index: 13, weight: 1 }, { index: 32, weight: 1 }, { index: 51, weight: 1 }],
  
    DOOR: {
  
      TOP: [22],
  
      LEFT: [
        [21]
      ],
  
      BOTTOM: [23],
  
      RIGHT: [
        [20]
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