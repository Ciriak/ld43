// Mapping with:

// - Single index for putTileAt

// - Array of weights for weightedRandomize

// - Array or 2D array for putTilesAt

export const TILE_MAPPING = {
    BLANK: 7,
    WALL: {
  
      TOP_LEFT: 41,
  
      TOP_RIGHT: 41,
  
      BOTTOM_RIGHT: 41,
  
      BOTTOM_LEFT: 41,
  
      // Let's add some randomization to the walls while we are refactoring:
  
      TOP: [{ index: 39, weight: 4 }, { index: [40,41, 42], weight: 1 }],
  
      LEFT: [{ index: 39, weight: 4 }, { index: [40,41, 42], weight: 1 }],
  
      RIGHT: [{ index: 39, weight: 4 }, { index: [40,41, 42], weight: 1 }],
  
      BOTTOM: [{ index: 39, weight: 4 }, { index: [40,41, 42], weight: 1 }]
  
    },
  
    FLOOR: [{ index: [13], weight: 9 }, { index: [14, 15, 21], weight: 1 }, { index: [20,19,18], weight: 0.3 }],
  
    POT: [{ index: 13, weight: 1 }, { index: 32, weight: 1 }, { index: 51, weight: 1 }],
  
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