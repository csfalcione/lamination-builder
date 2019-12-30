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
    points: NaryString[]
    branch?: boolean
    flipEndpoints?: boolean
    flipDiameters?: boolean
  }>
  branches: Array<{
    chord: [NaryString, NaryString]
    endpoints: NaryString[]
    flip?: boolean
  }>
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


### Leaves
Leaves are merely the initial polygons (or chords) specified by an array of their vertices that get recursively pulled back.


### Branches
Branches of the inverse map are necessary to disambiguate and guide pullbacks. These branches are mutually exclusive sets of points on the circle, satisfying that each set of points maps 1:1 onto the circle. Each branch is specified only by a \[critical] chord and some additional set of points. The interior of the chord (the smaller of the two regions of the circle split by the chord) is included, but not the endpoints. The points specified by the `endpoints` array are also included in the region. There is no restriction on the number of extra points provided. They don't even have to be a chord's otherwise-excluded endpoints.

Nested regions are supported. The smaller regions contained within larger regions are excluded from the larger regions.

It is up to the user to ensure the correctness of branches. Incorrectly-specified branches may result in intersecting chords, missing polygons, unforseen bugs, or death. If you have died as a result of using this software, please refer to the `LICENSE` file included at the root of this project.


#### Disambiguating Diameters and the `flip` Directive
The interior of a branch is usually determined by the smaller of the two regions bordering its chord. The two regions split by a diameter are of equal size, however, introducing ambiguity. With no additional intervention, the application will pick the "lower" region. Given `a < b`, a diameter connecting `a` and `b` will correspond to the interval `(a, b)`. If you instead wish for it to correspond to the union of `(b, 1)` and `(0, a)`, then the chord's `flip` directive may be used.

Note that the `flip` directive does not affect which endpoints are included.

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

#### Treating Branches as Leaves
Some laminations involve using the same set of chords as both leaves and branches. The `branch` directive can be added to a leaf to indicate that its chords should also be interpreted as branches, reducing the surface area for user-error. By default, the clockwise-most endpoint of each chord is selected. If you instead want the counter-clockwise-most endpoint to be selected instead, also include the `flipEndpoints` directive. If your endpoint setup is more complicated than that, then this directive isn't for you. Diameter ambiguity may be resolved with the `flipDiameters` directive.

For example, the following two definitions are equivalent.

```json
{
  "name": "ac3-gon",
  "description": "This particular lamination pulls back an all-critical triangle, and is sensitive to the particular endpoints chosen. Pull back twice with and without `flipEndpoints` to see the difference.",
  "base": 3,
  "branches": [],
  "leaves": [
    {
      "points": ["_01", "1_10", "2_10"],
      "branch": true,
      "flipEndpoints": true
    }
  ]
}
```

```json
{
  "name": "ac3-gon_verbose",
  "base": 3,
  "branches": [
    {
      "chord": ["_01", "1_10"],
      "endpoints": ["1_10"]
    },
    {
      "chord": ["1_10", "2_10"],
      "endpoints": ["2_10"]
    },
    {
      "chord": ["2_10", "_01"],
      "endpoints": ["_01"]
    }
  ],
  "leaves": [
    {"points": ["_01", "1_10", "2_10"]}
  ]
}
```

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
This app is hosted (for free) by GitHub Pages. Deploy with:
```
npm run build -- --prod --base-href=/lamination-builder/
npx angular-cli-ghpages --dir=dist/lamination-builder
```
