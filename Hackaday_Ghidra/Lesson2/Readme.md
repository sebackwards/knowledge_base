## Control Flow in Assembly
Refers to instructions that change the flow of the execution: if/else/switch. RIP contains the address of the next instruction adn its value can be altered with JPM instructions (and others):
* JMP ADDR

JMP also can be executed based on the RFLAGS register with its subclass of opcodes:
* JE: Jump if equal/zero flag
* JNE: Jump if not equal/nonzero flag
* JG: Jump if greater (signed)
* JL: Jump if less (signed)

## Conttol Flow in Ghidra
* Ghidra has a graphview to display blocks of code representing each branch. 
* Can be accessed by:
    * Highlighting a function name
    * Window -> Function Graph
