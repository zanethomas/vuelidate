# Advanced usage

## Per component mixin

Alternatively it is possible to apply all the Vuelidate functionality to dedicated components via a mixin.

```vue
<script>
import { VuelidateMixin } from '@vuelidate/core'

export default {
  mixins: [VuelidateMixin],
  data(){ },
  validations() { }
}
</script>
```

Everything else is the same.

## Composition API

```js
import { ref } from 'vue' // or '@vue/composition-api' in Vue 2.x
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

export default {
  setup () {
    const name = ref('')
    const emailAddress = ref('')
    const rules = {
      name: { required },
      emailAddress: { required, email }
    }

    const v = useVuelidate(rules, { name, emailAddress })

    return { name, emailAddress, v }
  }
}
```

## Nested validations

When using `useVuelidate`, Vuelidate will collect all validation `$errors` from all nested components. No need to pass any props or listen to any events.

This is the recommended approach when handling collections. Create a new, nested component with it’s own validation rules.

::: warning
Currently this only works when child components also use `useVuelidate` to register their validation rules.
:::

```vue
<template>
  <div>
    <CompA />
    <CompB />

    <p v-for="(error, index) of v.$errors" :key="index">
      {{ error.$message }}
    </p>
  </div>
<template>

<script>
import { useVuelidate } from '@vuelidate/core'

export default {
  setup () {
    const v = useVuelidate() // this will contain all $errors from both <CompA> and <CompB>

    return { v }
  }
}
</script>
```

## Validating Collections

::: warning
`$each` has been removed. Use the above solution (nested validations) instead.
:::

## Returning extra data from validators

In more advanced use cases, it is necessary for a validator to return more than just a boolean, extra data to help the user.
In those cases, validators can return an object, which must have an `$invalid` key, and any other data, that the developer chooses.

```js
function validator (value) {
  if(value === 'something') return true
  return {
    $invalid: true,
    data: { message: 'The value must be "something"', extraParams: {} }
  }
}
```

The entire response can be accessed from `$params.$response` property in the validation and error objects. We can use this to show a more custom error message.

```js
const validatorWithMessage = withMessage($params => _.get($params, '$response.data.message', 'Invalid data'), validator)
```

If you need to access the data, you can just go into the `$params` property.

```js
export default {
  computed: {
    someComputed() {
      const params = this.v.someProperty.validator.$params
      return params.$response ? params.$response.$data : null
    }
  }
}
```
