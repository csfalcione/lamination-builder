import { LaminationDefinition } from './definitions'


export const rabbitLamination: LaminationDefinition = {
  base: 2,
  name: "Rabbit",
  description: "Lamination corresponding to the Douady Rabbit Julia set.",
  branches: [
    {
      chord: ['_001', '1_010'],
      endpoints: ['_001']
    }
  ],
  leaves: [
    { points: ['_001', '_010', '_100'] }
  ],
}

export const never_close_quintary_def: LaminationDefinition = {
  name: 'never close (quintary)',
  base: 5,
  leaves: [
    { points: ['_033', '_200', '_300'] },
    { points: ['_020', '_030', '_303'] },
    { points: ['_002', '_003', '_330'] },
  ],
  branches: [
    {
      chord: ['0_033', '_303'],
      endpoints: ['0_033']
    },
    {
      chord: ['_033', '1_330'],
      endpoints: ['1_330']
    },
    {
      chord: ['_200', '3_002'],
      endpoints: ['3_002']
    },
    {
      chord: ['_330', '4_303'],
      endpoints: ['4_303']
    },
  ]
}

export const template =
  `\
{
  name: 'EXAMPLE LAMINATION',
  base: 3, // property names don't need to be in quotes
  description: "A sample lamination that exercises the lion's share of available options. Any omitted optional parameters will receive a default value. Note the optional settings overrides and variety of ways to specify color.",
  branches: [
    {
      // Line comments are supported.
      chord: ['_002', '2_020'],
      endpoints: ['2_020'], // trailing commas are acceptable
    },
    {
      chord: ['_101', '2_011'], // Single quotes ' _or_ double quotes " can be used for strings.
      endpoints: ['2_011'],
    }
  ],
  leaves: [
    {points: ['_002', '_101', '_201']},
    {
      points: ['_011', '_020', '_012'],
      settings: {
        fillColor: '#FF0000'
      },
    },
    {points: ['_110', '_200', '_120']},
    {points: ['_110'], settings: {strokeWidth: 6, /*fillColor: 'black'*/}}, // block comments are supported too
  ],
  settings: {
    size: 700,
    // renderHyperbolic: true,
    criticalChords: {
      strokeWidth: 2
    },
    polygons: {
      fillColor: 'rgb(0, 100, 0)'
    },
    circle: {
      fillColor: 'rgb(205, 205, 205)',
      strokeColor: 'black',
      strokeWidth: 5,
    },
  }
}
// The VS Code extension 'JSON5 syntax' is handy.
`

