# Reproduce useInnerBlocksProps error

This plugin adds blocks to reproduce the errors related to `useInnerBlocksProps()` (__experimentalUseInnerBlocksProps).

The errors occurs in **WordPress 5.7**.
( In my memory, these are the errors that didn't occur in 5.6. )

- TEST-01 Block
- TEST-02 Block

## How to reproduce the error

Build the plugin.

```
npm i

npm run build
```

Start WordPress.


```
wp-env start
```

### Error 1:

- Adding a new "TEST-01" block.
- Then the "Maximum update depth exceeded" error will occur.
- But, Saving the post and refreshing the screen will fix the problem.

For some reason, an error occurs only when inserting for the first time.


#### Error occurrence condition

1. The `apiVersion` is `2`.
2. The block uses `__experimentalUseInnerBlocksProps`.
3. In addition, `__experimentalUseInnerBlocksProps` is used in its child blocks.
4. The `template` option is specified in the child block.
5. `useSelect` is used in the parent block, and the data of the inner blocks is acquired by `select('core/block-editor').getBlocks()`.


#### How to avoid the error

1. Remove the `template` option from the child block.
2. The timing to get the data of the inner blocks is postponed until the necessary time comes.
    1. For example, get only the `getBlocks()` method with `useSelect` and execute `getBlocks()` inside the onChange process of the block controller.


### Error 2:

- Adding a new "TEST-02" block.
- A block with two inner blocks will be inserted.
- Click the border of the inserter that appears when you hover the mouse between blocks.
- Then only the back block will crash. (If you don't get the error, try clicking a few times.)



#### Error occurrence condition

1. The `apiVersion` is `2`.
2. The block uses `__experimentalUseInnerBlocksProps`.
3. In addition, `__experimentalUseInnerBlocksProps` is used in its child blocks.
4. The `allowedBlocks` option is specified in the child block, and **specify the array directly** in the `allowedBlocks` option.


#### How to avoid the error

- Specify `allowedBlocks` with a **variable**.

For example,

```js
// NG
const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ['core/paragraph', 'core/list'],
});
```

to

```js
// OK
const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
});
```

(Note: `ALLOWED_BLOCKS` is defined outside of `registerBlockType()`.)
