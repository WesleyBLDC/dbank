import { json } from '@sveltejs/kit'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

export async function POST({ request }) {
    try {
        const { command } = await request.json()
        console.log('Executing command:', command)

        const homeDir = os.homedir()
        const cwd = path.join(homeDir, 'Documents', 'GitHub', 'StellaRamp')

        console.log('Executing in directory:', cwd)

        const { stdout, stderr } = await execAsync(command, { cwd })

        // Combine stdout and stderr as the result
        const result = stdout + stderr

        console.log('Command execution result:', result)
        return json({ result })
    } catch (error) {
        console.error('Error invoking contract:', error)
        return json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        )
    }
}
