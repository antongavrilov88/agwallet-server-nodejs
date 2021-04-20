import { app } from '../app'
import {sum} from './dummy'

test('Dummy unit test', () => {
    const actual = sum(1, 2)
    expect(actual).toBe(3)
})