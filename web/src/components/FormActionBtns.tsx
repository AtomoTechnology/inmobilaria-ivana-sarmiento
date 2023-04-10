import React from 'react'
import InlineDots from './loadings/Inlinedots'

const FormActionBtns = ({ onClose, savingOrUpdating }: { onClose: any, savingOrUpdating: boolean }) => {
    return (
        <section className='btns-form-actions action flex items-center gap-x-3 mt-8'>
            <button
                className='btn sec !py-1'
                onClick={() => { onClose() }}
                disabled={savingOrUpdating}
                type='button'
            >
                Cancelar
            </button>
            <button
                className='btn gradient  !py-1'
                disabled={savingOrUpdating}
                type='submit'
            >
                {savingOrUpdating ? (
                    <span className='flex items-center gap-x-2'>
                        <span>Guardando</span>
                        <InlineDots />
                    </span>
                ) : 'Guardar'}
            </button>
        </section>
    )
}

export default FormActionBtns