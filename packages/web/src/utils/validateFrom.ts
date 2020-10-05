import { FormHandles, UnformErrors } from '@unform/core'
import { ObjectSchema, ValidationError } from 'yup'

import { ApiFieldError } from '~/services/api'

type Validator = {
  formRef: React.RefObject<FormHandles>
  data: unknown
  shape: ObjectSchema
}

type SetError = {
  formRef: React.RefObject<FormHandles>
  errors: ApiFieldError[]
}

const validateErrors = async ({
  formRef,
  data,
  shape
}: Validator): Promise<boolean> => {
  formRef.current?.setErrors({})
  try {
    await shape.validate(data, { abortEarly: false })

    return true
  } catch (err) {
    const errors = err as ValidationError
    const validation: UnformErrors = {}

    errors.inner.forEach(({ path, message }) => {
      validation[path] = message
    })

    formRef.current?.setErrors(validation)

    return false
  }
}

const setFormErrors = ({ errors, formRef }: SetError) => {
  const validation: UnformErrors = {}

  if (!errors) {
    return
  }

  errors.forEach(({ field, message }) => {
    validation[field] = message
  })

  formRef.current?.setErrors(validation)
}

export { validateErrors, setFormErrors }
