import minLength from '../raw/minLength'

export default (length, label = 'This field') => ({
  $validator: minLength(length),
  $message: ({ $params }) => `${$params.label} should be at least ${$params.length} long.`,
  $params: { length, label }
})
