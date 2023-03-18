
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='insurance'>Seguro</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={insurance || ''}
								onChange={(value) => handleInputChange(value, 'insurance')}
							/>
						</fieldset>

						<fieldset className=''>
							<label htmlFor='admExpenses'>Gastos Adm</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={admExpenses || ''}
								onChange={(value) => handleInputChange(value, 'admExpenses')}
							/>
							{errors?.admExpenses && <FormError text='EL formato de pago es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='water'>Aguas</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={water || ''}
								onChange={(value) => handleInputChange(value, 'water')}
							/>
							{/* {errors?.water && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='TGI'>TGI</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={TGI || ''}
								onChange={(value) => handleInputChange(value, 'TGI')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='compensation'>Compensación</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={compensation || ''}
								onChange={(value) => handleInputChange(value, 'compensation')}
							/>
							{/* {errors?.compensation && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='recharge'>Recargo</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={recharge || ''}
								onChange={(value) => handleInputChange(value, 'recharge')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
					</FieldsetGroup>

          <fieldset className=''>
							<label htmlFor='bankingExpenses'>Gastos bancario</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={bankingExpenses || ''}
								onChange={(value) => handleInputChange(value, 'bankingExpenses')}
							/>
							{/* {errors?.bankingExpenses && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>

            <fieldset className=''>
							<label htmlFor='extraExpenses'>Expensas extra</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={extraExpenses || ''}
								onChange={(value) => handleInputChange(value, 'extraExpenses')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>

            <fieldset className=''>
							<label htmlFor='totalPro'>Total Propietario</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={totalPro || ''}
								onChange={(value) => handleInputChange(value, 'totalPro')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>