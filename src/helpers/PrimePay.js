import md5 from 'md5'

export const PrimePayHelper = (str) => {
    return md5(str)
}

{/* <form action={'https://pay.primepayments.io/API/v2/'}>
<input type="hidden" name='action' value={'initPayment'}/>
<input type="hidden" name='project' value={'1'}/>
<input type="hidden" name='sum' value={'300'}/>
<input type="hidden" name='currency' value={'USD'}/>
<input type="hidden" name='innerID' value={'testfetch'}/>
<input type="hidden" name='email' value={'testestestestest758@gmail.com'}/>
<input type="hidden" name='sign' value={PrimePayHelper(`test_APIinitPayment1300USDtestfetchtestestestestest758@gmail.com`)}/>
<input type="hidden" name='comment' value={'test'}/>
<button type='submit'>Lets</button>
</form> */}



// newForm.append('action', 'initPayment');
// newForm.append('project', '1');
// newForm.append('sum', '300');
// newForm.append('currency', 'USD');
// newForm.append('innerID', 'testfetch');
// newForm.append('email', 'testestestestest758@gmail.com');
// newForm.append('sign', PrimePayHelper(`test_APIinitPayment1300USDtestfetchtestestestestest758@gmail.com`));
// newForm.append('comment', 'trade');