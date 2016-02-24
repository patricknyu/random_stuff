def fib(n):
	if(n == 1):
		return [0]
	elif(n==2):
		return [0,1]
	else:
		fib_list = [0,1]
		for i in range(2,n+1):
			fib_list.append(fib_list[-1]+fib_list[-2])
		return fib_list
	
def sieve(n):
	sieve = [True]*n
	sieve[0] = False
	sieve[1] = False

	for i in range(2,n):
		if sieve[i]:
			for j in range(i*i,n,i):
				sieve[j] = False
	return sieve

def fizzbuzz(n):
	fib_list = fib(n)
	s = sieve(fib_list[-1]+1)
	for i in range(0,len(fib_list)):
		if(fib_list[i] == 0):
			pass
		elif(fib_list[i] %3 == 0):
			fib_list[i] = "Buzz"
		elif(fib_list[i] %5 == 0):
			fib_list[i] = "Fizz"
		elif(s[fib_list[i]]):
			fib_list[i] = "FizzBuzz"
	return fib_list

length = input('Enter how many fibonnaci fizzbuz you want :')
print(fizzbuzz(length))
