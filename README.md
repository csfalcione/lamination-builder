# LaminationBuilder
This is a web app for generating pullback laminations, building on top of <a href="https://github.com/csfalcione/laminations-lib">laminations-lib</a>. Try it out <a href="https://csfalcione.github.io/lamination-builder">here</a>.

Presently no effort has been put into making a pretty interface and the only way to get data into the application is by uploading a JSON file specifying the inital data for a lamination.

## Usage

### Upload file format
The uploaded file should contain a JSON object with the following structure:
```typescript
export interface LaminationDefinition {
  base: number
  name?: string
  description?: string
  leaves: Array<{
    points: string[]
  }>
  branches: Array<{
    chord: [string, string]
    endpoints: string[]
    flip?: boolean
    leaf?: boolean
  }>
  branchesAreLeaves?: boolean
}
```

For example:
```json
{
  "name": "EXAMPLE LAMINATION",
  "base": 3,
  "description": "Sample description.",
  "branches": [
    {
      "chord": ["_002", "2_020"],
      "endpoints": ["2_020"]
    },
    {
      "chord": ["_101", "2_011"],
      "endpoints": ["2_011"]
    }
  ],
  "leaves": [
    {"points": ["_002", "_101", "_201"]},
    {"points": ["_011", "_020", "_012"]},
    {"points": ["_110", "_200", "_120"]}
  ]
}
```


### NaryString (points on the circle)
A `NaryString` is a string specifying digits of a `base`-ary fraction representing an angle (or a point on the unit circle, depending on your viewpoint), in revolutions e.g. on the interval `[0, 1)`. The fraction will have some number of digits followed by some number of repeating digits. For example:
- `0_123` corresponds to `0.0123123123...`
- `_01` corresponds to `0.01010101...`
- `_11` corresponds to `0.111111...` (which is equal to `0` in binary)
The internal representation for these fractions supports mapping backward and forwards without rounding error. If `base` is greater than or equal to `10`, delimit digits with commas e.g. `17,10_9,0,11`.

### Branches
Branches of the inverse map are necessary to disambiguate and guide the pullbacks of the lamination. These branches are mutually exclusive sets of points on the circle, satisfying that that set of points maps 1:1 onto the unit circle. Each branch is specified only by a [critical] chord and some additional set of points. The interior of the chord (the smaller of the two regions of the circle split by the chord) is included, but not the endpoints of the chord. The points specified by the `endpoints` array are also included in the region. There is no restriction on the number of extra points provided, nor do they have to be the otherwise-excluded endpoints of the chord.

Nested regions are supported. The smaller regions contained within larger regions are excluded from the larger regions.

It is up to the user to ensure the correctness of branches. Incorrectly-specified branches may result in intersecting chords, missing polygons, unforseen bugs, or death. If you have died as a result of using this software, please refer to the `LICENSE` file included at the root of this project.


#### Disambiguating Diameters and the `flip` Directive
The interior of a branch is usually determined by the smaller of the two regions a given chord splits the disk into. The two regions split by a diameter are of equal size, however, introducing ambiguity. With no additional intervention, the application will pick the "lower" region. Given `a < b`, a diameter connecting `a` and `b` will correspond to the interval `(a, b)`. If you instead wish for it to correspond to the union of `(b, 1)` and `(0, a)`, then the chord's `flip` directive may be used.

For example:
```json
{
  "name": "S4-IRLx: Flip Example",
  "description": "Without the `flip` directive here, the diameter's interior region would redundantly include the two touching smaller chords. Though in this case, the diameter could be excluded entirely at the expense of it not being rendered, relying on the app's ability to infer the last branch.",
  "base": 4,
  "branches": [
    {
        "chord": ["0_201", "_120"],
        "endpoints": ["_120"]
    },
    {
        "chord": ["0_201", "2_201"],
        "endpoints": ["0_201"],
        "flip": true
    },
    {
        "chord": ["_120", "2_201"],
        "endpoints": ["2_201"]
    },
    {
        "chord": ["_012", "3_120"],
        "endpoints": ["3_120"]
    }
  ],
  "leaves": [
    {"points": ["_122", "_201"]}
  ]
}
```


### Leaves
Leaves are merely the initial polygons (or chords) specified by an array of their vertices that get recursively pulled back.

## Local Development

- Install <a href="https://www.npmjs.com/get-npm">npm</a>

- Clone the repository
```
git clone https://github.com/csfalcione/lamination-builder
```

- Enter the repository
```
cd lamination-builder
```

- Install dependencies
```
npm install
```

- Start local server
```
npm start
```
After compilation, the server should be running on `http://localhost:4200`.

- Deploy to GitHub Pages

Assuming you have <a href="https://github.com/angular-schule/angular-cli-ghpages/blob/master/docs/README_standalone.md">angular-cli-ghpages</a> installed, run:
```
npm run build -- --prod --base-href=/lamination-builder/
npx angular-cli-ghpages --dir=dist/lamination-builder
```
