import {
	KUSAMA_TEST_OPTIONS,
	TEST_BASE_TX_INFO,
	TEST_METHOD_ARGS,
} from '@substrate/txwrapper-dev';

import { balancesTransfer } from '../../test-helpers';
import { encodeUnsignedTransaction } from '../construct/encodeUnsignedTx';
import { decodeUnsignedHexTx } from './decodeUnsignedHexTx';

describe('decodeUnsignedHexTx', () => {
	it('should return the correct output', () => {
		const unsigned = balancesTransfer(
			TEST_METHOD_ARGS.balances.transfer,
			TEST_BASE_TX_INFO,
			KUSAMA_TEST_OPTIONS
		);

		const expectedResponse = {
			method: {
				args: {
					dest: { id: 'Fy2rsYCoowQBtuFXqLE65ehAY9T6KWcGiNCQAyPDCkfpm4s' },
					value: 12,
				},
				callIndex: '0x0407',
			},
			version: 4,
		};

		const encoded = encodeUnsignedTransaction(unsigned, KUSAMA_TEST_OPTIONS);
		const decoded = decodeUnsignedHexTx(encoded, KUSAMA_TEST_OPTIONS);

		expect(decoded).toStrictEqual(expectedResponse);
	});
});
