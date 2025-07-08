const wout = (s) => {
    process.stdout.write(s);
}

const pad_str = (s, len, ch) => {
    ch = ch || ' ';
    while (s.length < len) {
        s = ch + s;
    }
    return s
}

const hex_digit = (n, len) => {
    return pad_str(n.toString(16), len || 2, '0')
}

const printable_ch = (c) => {
    // [space to '~')
    if (c > 0x20 && c <= 0x7e) {
        return String.fromCharCode(c);
    } else {
        return '.';
    }
}

const hexdump = (buf, len) => {
    len = len || buf.length;

    const maxline = 16;
    let ascii = new Array(maxline);
    let i;

    for (i = 0; i < len; i++) {
        if (i % maxline == 0) {
            if (i > 0) {
                wout(" " + ascii.join(""))
                wout("\n");
            }
            wout(hex_digit(i, 4) + ": ")
        }

        // output the hex digit
        wout(hex_digit(buf[i]));
        wout(" ");
        ascii[i % maxline] = printable_ch(buf[i]);
    }
    if (i % maxline != 0) {
        let diff = maxline - (i % maxline);
        wout("   ".repeat(diff))
    }
    
    wout(" " + ascii.slice(0, (i % maxline)).join("") + "\n")
}

/*
let buf = Buffer.alloc(500);
for (let i = 0; i < buf.length; i++) {
    buf[i] = i & 0xff;
}
hexdump(buf)
*/

module.exports = hexdump;
