'use strict';
jest.mock('fs');
import secenv from '../index'

describe('listFilesInDirectorySync', () => {
	const MOCK_FILE_INFO = {
		'/path/to/secret1': 'user',
		'/path/to/secret2': 'password',
	};
	
	const SECRETS = {
		'secret1': 'user',
		'secret2': 'password',
	};
	
	beforeEach(() => {
		require('fs').__setMockFiles(MOCK_FILE_INFO);
	});
	
	afterEach(() => {
		delete process.env.secret1
		delete process.env.secret2
	});
	
	test('SecEnv should not override existing environment by default', () => {
		process.env['secret1'] = 'admin'
		const secrets = secenv({ dir: '/path/to' })
		expect(process.env.secret1).toEqual('admin');
		expect(process.env.secret2).toEqual('password');
		expect(secrets.getSecrets()).toEqual(SECRETS)
	});
	
	test('SecEnv should override existing environment', () => {
		process.env['secret1'] = 'admin'
		const secrets = secenv({ dir: '/path/to', override: true })
		expect(process.env.secret1).toEqual('user');
		expect(process.env.secret2).toEqual('password');
		expect(secrets.getSecrets()).toEqual(SECRETS)
	});
	
	test('SecEnv should console.log a message when secrets directory does not exist', () => {
		const consoleSpy = jest.spyOn(console, 'log');
		const secrets = secenv({ dir: '/path/not/exist'})
		expect(consoleSpy).toHaveBeenCalledWith('[SecEnv][DEBUG] Docker secrets is not mounted into the container');
		expect(secrets.getSecrets()).toEqual({})
	});
	
});
