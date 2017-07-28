# Supervised Learning Example

This is as example of how to solve a supervised learning problem using the ```supervised-learning``` npm module. node.js and npm are pre-requisites to run it. 

## Install

Clone this repo then:

```
npm install
```

## Playing a bit

### The last letter of a person's name
```npm run a```

### The last 3 letters of a person's name
```npm run b```

### The last 3 letters and the last letter of a person's name
```npm run c```

## The best discovered feature combination

This example uses the best combination of feature extractors that were discovered from running [the big example](#the-big-example) below. 

It takes a few seconds to run.

```
npm run one
```

## Discovering the best feature combinations

This example take a set of feature extractors and tries all possible combinations and discovers the best feature combinations. 

It takes a few hours to run.

```
npm run all
```
