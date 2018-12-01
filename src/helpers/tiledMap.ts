// Mapping with:

// - Single index for putTileAt

// - Array of weights for weightedRandomize

// - Array or 2D array for putTilesAt

export const TILE_MAPPING = {
    BLANK: 126,
    WALL: {
  
      TOP_LEFT: 48,
  
      TOP_RIGHT: 52,
  
      BOTTOM_RIGHT: 144,
  
      BOTTOM_LEFT: 140,
  
      // Let's add some randomization to the walls while we are refactoring:
  
      TOP: [{ index: 49, weight: 4 }, { index: [50, 51], weight: 1 }],
  
      LEFT: [{ index: 71, weight: 4 }, { index: [94, 117], weight: 1 }],
  
      RIGHT: [{ index: 75, weight: 4 }, { index: [98, 121], weight: 1 }],
  
      BOTTOM: [{ index: 141, weight: 4 }, { index: [142, 143], weight: 1 }]
  
    },
  
    FLOOR: [{ index: 72, weight: 9 }, { index: [73, 74, 95, 96,97], weight: 1 }],
  
    POT: [{ index: 13, weight: 1 }, { index: 32, weight: 1 }, { index: 51, weight: 1 }],
  
    DOOR: {
  
      TOP: [94, 96, 98],
  
      LEFT: [
        [371],
        [394],
        [417]
      ],
  
      BOTTOM: [94, 96, 98],
  
      RIGHT: [
        [417],
        [394],
        [371]
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